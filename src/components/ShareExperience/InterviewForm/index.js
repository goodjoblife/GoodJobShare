import React from 'react';
import R from 'ramda';
import Helmet from 'react-helmet';
import { scroller } from 'react-scroll';

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

const createSection = id => (subtitle, placeholder = '', titlePlaceholder = '請輸入標題，例：面試方式') => {
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
    this.onSumbit = this.onSumbit.bind(this);

    this.state = {
      ...defaultForm,
      submitted: false,
    };

    this.elementValidationStatus = {};
  }

  onSumbit() {
    const valid = interviewFormCheck(getInterviewForm(this.state));

    if (valid) {
      return postInterviewExperience(portInterviewFormToRequestFormat(getInterviewForm(this.state)));
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
    return value =>
      this.setState({
        [key]: value,
      });
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

  render() {
    return (
      <div className={styles.container}>
        <Helmet {...HELMET_DATA.SHARE_INTERVIEW} />
        <h1
          className="headingL"
          style={{
            textAlign: 'center',
          }}
        >
          面試經驗分享
        </h1>
        {
          this.state.submitted ?
            <h2
              style={{
                marginTop: '20px',
              }}
              className={styles.warning__wording}
            >
              oops! 請檢查底下紅框內的內容是否正確
            </h2> : null
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
          onSubmit={this.onSumbit}
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
