import React from 'react';
import R from 'ramda';
import { Switch } from 'react-router-dom';
import { scroller } from 'react-scroll';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import StepControl from './StepControl';
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
import {
  INVALID,
  INTERVIEW_FORM_ORDER,
  INTERVIEW_FORM_STEPS,
} from '../../../constants/formElements';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';
import { LS_INTERVIEW_STEPS_FORM_KEY } from '../../../constants/localStorageKey';

import SuccessFeedback from '../common/SuccessFeedback';
import FailFeedback from '../common/FailFeedback';
import RouteWithSubRoutes from '../../route';

function isExpired(ts) {
  return Date.now() - ts > 1000 * 60 * 60 * 24 * 3; // 3 days
}

const createSection = id => (
  subtitle,
  placeholder = '',
  titlePlaceholder = '段落標題，例：面試方式',
  content = '',
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

const experienceSectionId = idCounter();
const suggestionSectionId = idCounter();

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
    [experienceSectionId]: createBlock.sections(experienceSectionId)(
      '面試過程',
      undefined,
      undefined,
      '第一次面試：\n第二次面試：\n工作環境：',
    ),
    [suggestionSectionId]: createBlock.sections(suggestionSectionId)(
      '給其他面試者的中肯建議',
      undefined,
      undefined,
      '如何準備面試：\n是否推薦此份工作：\n其他注意事項：',
    ),
  },
  interviewQas: {},
  interviewSensitiveQuestions: [],
};

const isStepTabActive = step => (match, location) => {
  const matched = location.pathname.match(/step(\d+)$/);
  if (!matched) return false;
  const currentStep = parseInt(matched[1], 10);
  return currentStep >= step;
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
      const { __updatedAt, ...storedDraft } = JSON.parse(
        localStorage.getItem(LS_INTERVIEW_STEPS_FORM_KEY),
      );
      if (isExpired(__updatedAt)) {
        console.warn(`Stored draft expired at ${new Date(__updatedAt)}`);
        localStorage.removeItem(LS_INTERVIEW_STEPS_FORM_KEY);
      } else {
        defaultFromDraft = storedDraft;
      }
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

  componentDidUpdate(prevState) {
    if (!R.equals(this.state, prevState)) {
      localStorage.setItem(
        LS_INTERVIEW_STEPS_FORM_KEY,
        JSON.stringify({
          ...this.state,
          __updatedAt: Date.now(),
        }),
      );
    }
  }

  async onSubmit() {
    const valid = interviewFormCheck(getInterviewForm(this.state));

    if (valid) {
      localStorage.removeItem(LS_INTERVIEW_STEPS_FORM_KEY);
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
      console.info('topInvalidElement', topInvalidElement);
      for (let i = 0; i < INTERVIEW_FORM_STEPS.length; i++) {
        for (let elementName of INTERVIEW_FORM_STEPS[i]) {
          if (
            typeof elementName === 'function'
              ? elementName(topInvalidElement)
              : elementName === topInvalidElement
          ) {
            const targetPath = `/share/interview/step${i + 1}`;
            if (this.props.location.pathname !== targetPath) {
              await this.props.history.push(targetPath);
            }
          }
        }
      }

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
    const order = [
      ...INTERVIEW_FORM_ORDER,
      ...R.keys(this.state.sections).map(id => `section-${id}`),
    ];
    console.info(order, this.elementValidationStatus);
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
        return {
          [blockKey]: R.filter(block => block.id !== id)(state[blockKey]),
        };
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
      location: { pathname },
      routes,
    } = this.props;

    return (
      <div>
        <StaticHelmet.ShareInterview />
        <div className={styles.header}>
          <div className={styles.title}>面試心得分享</div>
          <div className={styles.stepsWrapper}>
            <StepControl.Group>
              {R.range(1, 4).map(i => (
                <StepControl key={i} isActive={isStepTabActive(i)}>
                  {i}
                </StepControl>
              ))}
            </StepControl.Group>
          </div>
        </div>
        {this.state.submitted && (
          <div
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
            className={styles.warning__wording}
          >
            oops! 請檢查底下紅框內的內容是否正確
          </div>
        )}
        {/*
          * Here we need to render all steps rather than use <Route />
          * Because rendering all steps allows us to register the handlers
          * when the input is not validated on submit
          */}
        <div
          style={{
            display: pathname === '/share/interview/step1' ? 'block' : 'none',
          }}
        >
          <Step1
            handleState={this.handleState}
            state={this.state}
            changeValidationStatus={this.changeValidationStatus}
          />
        </div>
        <div
          style={{
            display: pathname === '/share/interview/step2' ? 'block' : 'none',
          }}
        >
          <Step2
            handleState={this.handleState}
            state={this.state}
            changeValidationStatus={this.changeValidationStatus}
          />
        </div>
        <div
          style={{
            display: pathname === '/share/interview/step3' ? 'block' : 'none',
          }}
        >
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
        </div>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
