import React from 'react';
import R from 'ramda';
import Helmet from 'react-helmet';
import { scroller } from 'react-scroll';
import ReactGA from 'react-ga';
import { Heading } from 'common/base';

import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';

import styles from './InterviewForm.module.css';

import InterviewInfo from './InterviewInfo';
import InterviewExperience from './InterviewExperience';

import {
  postInterviewExperience,
} from '../../../apis/interviewExperiencesApi';

import {
  interviewFormCheck,
} from './formCheck';

import {
  handleBlocks,
  getInterviewForm,
  portInterviewFormToRequestFormat,
  idGenerator,
} from '../utils';

import { HELMET_DATA } from '../../../constants/helmetData';
import { INVALID, INTERVIEW_FORM_ORDER } from '../../../constants/formElements';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import {
  LS_INTERVIEW_FORM_KEY,
} from '../../../constants/localStorageKey';

const createSection = id => (subtitle, placeholder = '', titlePlaceholder = '段落標題，例：面試方式') => {
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

const createInterviewQa = id => (question = '') => ({
  id,
  question,
  answer: '',
});

const createBlock = {
  sections: createSection,
  interviewQas: createInterviewQa,
};

const idCounter = idGenerator();

const isBlockRemovable = blocks =>
  R.length(R.keys(blocks)) > 1;

const firstSectionId = idCounter();
const firstQaId = idCounter();

const defaultForm = {
  companyQuery: '',
  companyId: '',
  region: '',
  jobTitle: '',
  experienceInYear: null,
  education: null,
  interviewTimeYear: null,
  interviewTimeMonth: null,
  interviewResult: null,
  salaryType: 'month',
  salaryAmount: '',
  overallRating: 0,
  title: '面試經驗分享',
  sections: {
    [firstSectionId]: createBlock.sections(firstSectionId)(),
  },
  interviewQas: {
    [firstQaId]: createBlock.interviewQas(firstQaId)(),
  },
  interviewSensitiveQuestions: [],
};

class InterviewForm extends React.Component {
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
      defaultFromDraft = JSON.parse(localStorage.getItem(LS_INTERVIEW_FORM_KEY));
    } catch (error) {
      defaultFromDraft = null;
    }
    const defaultState = defaultFromDraft || defaultForm;

    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      ...defaultState,
    });
  }

  onSubmit() {
    const valid = interviewFormCheck(getInterviewForm(this.state));

    if (valid) {
      const p = postInterviewExperience(portInterviewFormToRequestFormat(getInterviewForm(this.state)));
      p.then(() => {
        ReactGA.event({
          category: GA_CATEGORY.SHARE_INTERVIEW,
          action: GA_ACTION.UPLOAD_SUCCESS,
        });
      }).catch(() => {
        ReactGA.event({
          category: GA_CATEGORY.SHARE_INTERVIEW,
          action: GA_ACTION.UPLOAD_FAIL,
        });
      });
      localStorage.removeItem(LS_INTERVIEW_FORM_KEY);
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
    const order = INTERVIEW_FORM_ORDER;
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
      localStorage.setItem(LS_INTERVIEW_FORM_KEY, JSON.stringify(state));
    };
  }

  appendBlock(blockKey) {
    return (subtitle, placeholder, titlePlaceholder) => {
      const id = idCounter();
      return this.setState(state => ({
        [blockKey]: {
          ...state[blockKey],
          [id]: createBlock[blockKey](id)(subtitle, placeholder, titlePlaceholder),
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

  handleSubmit() {
    localStorage.removeItem(LS_INTERVIEW_FORM_KEY);
    return postInterviewExperience(portInterviewFormToRequestFormat(getInterviewForm(this.state)));
  }

  render() {
    return (
      <div>
        <Helmet {...HELMET_DATA.SHARE_INTERVIEW} />
        <Heading size="l" marginBottomS center>
          面試經驗分享
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
        <InterviewInfo
          handleState={this.handleState}
          companyQuery={this.state.companyQuery}
          region={this.state.region}
          jobTitle={this.state.jobTitle}
          experienceInYear={this.state.experienceInYear}
          education={this.state.education}
          interviewTimeYear={this.state.interviewTimeYear}
          interviewTimeMonth={this.state.interviewTimeMonth}
          interviewResult={this.state.interviewResult}
          salaryType={this.state.salaryType}
          salaryAmount={this.state.salaryAmount}
          overallRating={this.state.overallRating}
          submitted={this.state.submitted}
          changeValidationStatus={this.changeValidationStatus}
        />
        <InterviewExperience
          handleState={this.handleState}
          title={this.state.title}
          sections={handleBlocks(this.state.sections)}
          appendSection={this.appendBlock('sections')}
          removeSection={this.removeBlock('sections')}
          editSection={this.editBlock('sections')}
          interviewQas={handleBlocks(this.state.interviewQas)}
          appendQa={this.appendBlock('interviewQas')}
          removeQa={this.removeBlock('interviewQas')}
          editQa={this.editBlock('interviewQas')}
          interviewSensitiveQuestions={this.state.interviewSensitiveQuestions}
          submitted={this.state.submitted}
          changeValidationStatus={this.changeValidationStatus}
        />
        <SubmitArea
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
