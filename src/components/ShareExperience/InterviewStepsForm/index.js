import React from 'react';
import R from 'ramda';
import { scroller } from 'react-scroll';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import cn from 'classnames';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from './InterviewForm.module.css';

import { interviewFormCheck } from './formCheck';

import {
  handleBlocks,
  getInterviewForm,
  portInterviewFormToRequestFormat,
  idGenerator,
} from '../utils';

import StaticHelmet from 'common/StaticHelmet';
import { INVALID, INTERVIEW_FORM_ORDER } from '../../../constants/formElements';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';
import { LS_INTERVIEW_FORM_KEY } from '../../../constants/localStorageKey';

import SuccessFeedback from '../common/SuccessFeedback';
import FailFeedback from '../common/FailFeedback';

const createSection = id => (
  subtitle,
  placeholder = '',
  titlePlaceholder = '段落標題，例：面試方式',
) => {
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

const isBlockRemovable = blocks => R.length(R.keys(blocks)) > 1;

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
      defaultFromDraft = JSON.parse(
        localStorage.getItem(LS_INTERVIEW_FORM_KEY),
      );
    } catch (error) {
      defaultFromDraft = null;
    }
    const defaultState = defaultFromDraft || defaultForm;

    this.setState({
      // eslint-disable-line react/no-did-mount-set-state
      ...defaultState,
    });

    ReactPixel.track('InitiateCheckout', {
      content_category: PIXEL_CONTENT_CATEGORY.VISIT_INTERVIEW_FORM,
    });
  }

  onSubmit() {
    const valid = interviewFormCheck(getInterviewForm(this.state));

    if (valid) {
      localStorage.removeItem(LS_INTERVIEW_FORM_KEY);
      const p = this.props.createInterviewExperience({
        body: portInterviewFormToRequestFormat(getInterviewForm(this.state)),
      });
      return p.then(
        response => {
          const experienceId = response.experience._id;

          ReactGA.event({
            category: GA_CATEGORY.SHARE_INTERVIEW,
            action: GA_ACTION.UPLOAD_SUCCESS,
          });
          ReactPixel.track('Purchase', {
            value: 1,
            currency: 'TWD',
            content_category:
              PIXEL_CONTENT_CATEGORY.UPLOAD_INTERVIEW_EXPERIENCE,
          });
          return () => (
            <SuccessFeedback
              buttonClick={() =>
                window.location.replace(`/experiences/${experienceId}`)
              }
            />
          );
        },
        error => {
          ReactGA.event({
            category: GA_CATEGORY.SHARE_INTERVIEW,
            action: GA_ACTION.UPLOAD_FAIL,
          });

          return ({ buttonClick }) => (
            <FailFeedback info={error.message} buttonClick={buttonClick} />
          );
        },
      );
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
    return Promise.reject();
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
      localStorage.setItem(LS_INTERVIEW_FORM_KEY, JSON.stringify(state));
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
        <div className={styles.header}>
          <div className={styles.title}>面試心得分享</div>
          <div className={cn(styles.stepTab, styles.active)} data-step="1">
            基本資料
          </div>
          <div className={styles.stepTab} data-step="2">
            更多資訊
          </div>
          <div className={styles.stepTab} data-step="3">
            心得分享
          </div>
        </div>
        <Switch>
          <Route
            path="/share/interview/step1"
            exact
            render={() => (
              <Step1
                handleState={this.handleState}
                state={this.state}
                changeValidationStatus={this.changeValidationStatus}
              />
            )}
          />
          <Route
            path="/share/interview/step2"
            exact
            render={() => (
              <Step2
                handleState={this.handleState}
                state={this.state}
                changeValidationStatus={this.changeValidationStatus}
              />
            )}
          />
          <Route
            path="/share/interview/step3"
            exact
            render={() => (
              <Step3
                handleState={this.handleState}
                state={this.state}
                sections={handleBlocks(this.state.sections)}
                appendSection={this.appendBlock('sections')}
                removeSection={this.removeBlock('sections')}
                editSection={this.editBlock('sections')}
                interviewQas={handleBlocks(this.state.interviewQas)}
                appendQa={this.appendBlock('interviewQas')}
                removeQa={this.removeBlock('interviewQas')}
                editQa={this.editBlock('interviewQas')}
                changeValidationStatus={this.changeValidationStatus}
                onSubmit={this.onSubmit}
              />
            )}
          />
          <Redirect to="/share/interview/step1" />
        </Switch>
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
