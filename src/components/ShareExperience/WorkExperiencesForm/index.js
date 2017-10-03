import React from 'react';
import R from 'ramda';
import Helmet from 'react-helmet';
import { scroller } from 'react-scroll';
import ReactGA from 'react-ga';
import { Heading } from 'common/base';

import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';

import WorkInfo from './WorkInfo';
import WorkExperience from './WorkExperience';

import {
  idGenerator,
  handleBlocks,
  workExperiencesToBody,
  propsWorkExperiencesForm,
} from '../utils';

import {
  postWorkExperience,
} from '../../../apis/workExperiencesApi';

import {
  workExperiencesFormCheck,
} from './formCheck';

import {
  LS_WORK_EXPERIENCES_FORM_KEY,
} from '../../../constants/localStorageKey';

import styles from './WorkExperiencesForm.module.css';

import { HELMET_DATA } from '../../../constants/helmetData';
import { INVALID, WORK_FORM_ORDER } from '../../../constants/formElements';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';

const createSection = id => (subtitle, placeholder = '', titlePlaceholder = '段落標題，例：實際工作內容') => {
  const section = {
    id,
    subtitle,
    placeholder,
    titlePlaceholder,
    content: '',
    isSubtitleEditable: false,
  };
  if (subtitle === '自訂段落' || !subtitle) {
    return {
      ...section,
      subtitle: '',
      isSubtitleEditable: true,
      placeholder,
      titlePlaceholder,
    };
  }
  return section;
};

const createBlock = {
  sections: createSection,
};

const idCounter = idGenerator();

const isBlockRemovable = blocks =>
  R.length(R.keys(blocks)) > 1;

const firstSectionId = idCounter();

const defaultForm = {
  companyQuery: '',
  companyId: '',
  region: '',
  jobTitle: '',
  experienceInYear: null,
  education: null,
  isCurrentlyEmployed: 'yes',
  jobEndingTimeYear: new Date().getFullYear(),
  jobEndingTimeMonth: new Date().getMonth(),
  salaryType: 'month',
  salaryAmount: '',
  weekWorkTime: '',
  recommendToOthers: null,
  title: '工作經驗分享',
  sections: {
    [firstSectionId]: createBlock.sections(firstSectionId)(),
  },
};

class WorkExperiencesForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.appendBlock = this.appendBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
    this.editBlock = this.editBlock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ...defaultForm,
      submitted: false,
    };

    this.elementValidationStatus = {};
  }

  componentDidMount() {
    let defaultFromDraft;

    try {
      defaultFromDraft = JSON.parse(localStorage.getItem(LS_WORK_EXPERIENCES_FORM_KEY));
    } catch (error) {
      defaultFromDraft = null;
    }

    const defaultState = defaultFromDraft || defaultForm;

    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      ...defaultState,
    });
  }

  onSubmit() {
    const valid = workExperiencesFormCheck(propsWorkExperiencesForm(this.state));

    if (valid) {
      const p = postWorkExperience(workExperiencesToBody(this.state));
      p.then(() => {
        ReactGA.event({
          category: GA_CATEGORY.SHARE_WORK,
          action: GA_ACTION.UPLOAD_SUCCESS,
        });
      }).catch(() => {
        ReactGA.event({
          category: GA_CATEGORY.SHARE_WORK,
          action: GA_ACTION.UPLOAD_FAIL,
        });
      });
      localStorage.removeItem(LS_WORK_EXPERIENCES_FORM_KEY);
      return p;
    }
    this.handleState('submitted')(true);
    const topInvalidElement = this.getTopInvalidElement();
    if (topInvalidElement !== null) {
      scroller.scrollTo(topInvalidElement, {
        duration: 1000,
        delay: 100,
        offset: -100,
        smooth: true,
      });
    }
    return null;
  }

  getTopInvalidElement = () => {
    const order = WORK_FORM_ORDER;
    for (let i = 0; i <= order.length; i += 1) {
      if (
        this.elementValidationStatus[order[i]] &&
        this.elementValidationStatus[order[i]] === INVALID
      ) {
        return order[i];
      }
    }
    return null;
  }

  changeValidationStatus = (elementId, status) => {
    this.elementValidationStatus[elementId] = status;
  }

  handleState(key) {
    return value => {
      const updateState = {
        [key]: value,
      };
      this.setState(updateState);
      const state = {
        ...this.state,
        ...updateState,
      };
      localStorage.setItem(LS_WORK_EXPERIENCES_FORM_KEY, JSON.stringify(state));
    };
  }

  appendBlock(blockKey) {
    return (subtitle, placeholder, titlePlaceholder) => {
      const id = idCounter();
      return this.setState(state => ({
        [blockKey]: {
          ...state[blockKey],
          [id]: createBlock.sections(id)(subtitle, placeholder, titlePlaceholder),
        },
      }));
    };
  }

  removeBlock(blockKey) {
    return id => this.setState(state => {
      if (isBlockRemovable(state[blockKey])) {
        return ({
          [blockKey]: R.filter(block => block.id !== id)(state[blockKey]),
        });
      }

      return null;
    });
  }

  editBlock(blockKey) {
    return id => key => value =>
      this.setState(state => ({
        [blockKey]: {
          ...state[blockKey],
          [id]: {
            ...state[blockKey][id],
            [key]: value,
          },
        },
      }));
  }

  render() {
    const {
      companyQuery,
      region,
      jobTitle,
      experienceInYear,
      education,
      isCurrentlyEmployed,
      jobEndingTimeYear,
      jobEndingTimeMonth,
      salaryType,
      salaryAmount,
      weekWorkTime,
      recommendToOthers,
      title,
      sections,
      submitted,
    } = this.state;

    return (
      <div>
        <Helmet {...HELMET_DATA.SHARE_WORK} />
        <Heading size="l" marginBottomS center>
          工作經驗分享
        </Heading>
        {
          this.state.submitted ?
            <div
              style={{
                marginTop: '20px',
              }}
              className={styles.warning__wording}
            >
              oops! 請檢查底下紅框內的內容是否正確
            </div> : null
        }
        <WorkInfo
          handleState={this.handleState}
          companyQuery={companyQuery}
          region={region}
          jobTitle={jobTitle}
          experienceInYear={experienceInYear}
          education={education}
          isCurrentlyEmployed={isCurrentlyEmployed}
          jobEndingTimeYear={jobEndingTimeYear}
          jobEndingTimeMonth={jobEndingTimeMonth}
          salaryType={salaryType}
          salaryAmount={salaryAmount}
          weekWorkTime={weekWorkTime}
          recommendToOthers={recommendToOthers}
          submitted={submitted}
          changeValidationStatus={this.changeValidationStatus}
        />
        <WorkExperience
          handleState={this.handleState}
          title={title}
          sections={handleBlocks(sections)}
          appendSection={this.appendBlock('sections')}
          removeSection={this.removeBlock('sections')}
          editSection={this.editBlock('sections')}
          submitted={submitted}
          changeValidationStatus={this.changeValidationStatus}
        />
        <SubmitArea
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default WorkExperiencesForm;
