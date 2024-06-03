import React from 'react';
import R from 'ramda';
import { scroller } from 'react-scroll';
import ReactGA from 'react-ga4';
import { Heading } from 'common/base';

import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';

import styles from './InterviewForm.module.css';

import InterviewInfo from './InterviewInfo';
import InterviewExperience from './InterviewExperience';
import { interviewFormCheck } from './formCheck';

import {
  handleBlocks,
  getInterviewForm,
  portInterviewFormToRequestFormat,
  idGenerator,
} from '../utils';

import StaticHelmet from 'common/StaticHelmet';
import { INVALID, INTERVIEW_FORM_ORDER } from 'constants/formElements';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import { LS_INTERVIEW_FORM_KEY } from 'constants/localStorageKey';

import { getUserPseudoId } from 'utils/GAUtils';

import SuccessFeedback from '../common/SuccessFeedback';
import FailFeedback from '../common/FailFeedback';
import { GA_MEASUREMENT_ID } from '../../../config';

const createSection = id => (
  subtitle,
  content = '',
  placeholder = '',
  titlePlaceholder = '段落標題，例：面試方式',
) => {
  const section = {
    id,
    subtitle,
    placeholder,
    titlePlaceholder,
    content,
    isSubtitleEditable: false,
  };
  if (subtitle === '自訂段落' || !subtitle) {
    return {
      ...section,
      subtitle,
      content,
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

let idCounter = idGenerator();

const isBlockRemovable = blocks => R.length(R.keys(blocks)) > 1;

const firstSectionId = idCounter();
const secondSectionId = idCounter();
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
    [firstSectionId]: createBlock.sections(firstSectionId)(
      '面試過程',
      '第一次面試：\n第二次面試：\n工作環境：',
    ),
    [secondSectionId]: createBlock.sections(secondSectionId)(
      '給其他面試者的中肯建議',
      '如何準備面試：\n是否推薦此份工作：\n其他注意事項：',
    ),
  },
  interviewQas: {
    [firstQaId]: createBlock.interviewQas(firstQaId)(),
  },
  interviewSensitiveQuestions: [],
};

const getMaxId = state => {
  const ids = [...R.keys(state.sections), ...R.keys(state.interviewQas)];
  const maxId = R.reduce(R.max, -Infinity, ids);
  if (maxId === undefined) return -1;
  return maxId;
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
      const { __idCounterCurrent, ...storedDraft } = JSON.parse(
        localStorage.getItem(LS_INTERVIEW_FORM_KEY),
      );
      defaultFromDraft = storedDraft;
      idCounter = idGenerator(
        typeof __idCounterCurrent !== undefined
          ? __idCounterCurrent
          : getMaxId(storedDraft),
      );
    } catch (error) {
      defaultFromDraft = null;
    }
    const defaultState = defaultFromDraft || defaultForm;

    this.setState({
      // eslint-disable-line react/no-did-mount-set-state
      ...defaultState,
    });

    ReactGA.event({
      category: GA_CATEGORY.SHARE_INTERVIEW_ONE_PAGE,
      action: GA_ACTION.START_WRITING,
    });
  }

  onSubmit = async () => {
    const valid = interviewFormCheck(getInterviewForm(this.state));

    if (valid) {
      localStorage.removeItem(LS_INTERVIEW_FORM_KEY);
      const ga_user_pseudo_id = await getUserPseudoId(GA_MEASUREMENT_ID);
      const extra = {
        form_type: GA_CATEGORY.SHARE_INTERVIEW_ONE_PAGE,
        ga_user_pseudo_id,
      };

      try {
        const response = await this.props.createInterviewExperience({
          body: portInterviewFormToRequestFormat(
            getInterviewForm(this.state),
            extra,
          ),
        });
        const experienceId = response.createInterviewExperience.experience.id;

        ReactGA.event({
          category: GA_CATEGORY.SHARE_INTERVIEW_ONE_PAGE,
          action: GA_ACTION.UPLOAD_SUCCESS,
          label: experienceId,
        });
        return () => (
          <SuccessFeedback
            buttonClick={() => {
              // add delay to more ensure event being sent to GA.
              setTimeout(() => {
                window.location.replace(`/experiences/${experienceId}`);
              }, 1500);
            }}
          />
        );
      } catch (error) {
        ReactGA.event({
          category: GA_CATEGORY.SHARE_INTERVIEW_ONE_PAGE,
          action: GA_ACTION.UPLOAD_FAIL,
        });

        return ({ buttonClick }) => (
          <FailFeedback info={error.message} buttonClick={buttonClick} />
        );
      }
    } else {
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
      return Promise.reject();
    }
  };

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
  };

  changeValidationStatus = (elementId, status) => {
    this.elementValidationStatus[elementId] = status;
  };

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
      localStorage.setItem(
        LS_INTERVIEW_FORM_KEY,
        JSON.stringify({
          ...state,
          __idCounterCurrent: idCounter.getCurrent(),
        }),
      );
    };
  }

  appendBlock(blockKey) {
    return (subtitle, placeholder, titlePlaceholder) => {
      const id = idCounter();
      return this.setState(state => ({
        [blockKey]: {
          ...state[blockKey],
          [id]: createBlock[blockKey](id)(
            subtitle,
            placeholder,
            titlePlaceholder,
          ),
        },
      }));
    };
  }

  removeBlock(blockKey) {
    return id =>
      this.setState(state => {
        if (isBlockRemovable(state[blockKey])) {
          return {
            [blockKey]: R.filter(block => block.id !== id)(state[blockKey]),
          };
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
    return (
      <div>
        <StaticHelmet.ShareInterview />
        <Heading size="l" marginBottomS center>
          面試經驗分享
        </Heading>
        {this.state.submitted ? (
          <div
            style={{
              marginTop: '20px',
            }}
            className={styles.warning__wording}
          >
            oops! 請檢查底下紅框內的內容是否正確
          </div>
        ) : null}
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
        <SubmitArea onSubmit={this.onSubmit} />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
