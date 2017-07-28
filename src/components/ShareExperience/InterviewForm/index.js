import React, { PropTypes } from 'react';
import R from 'ramda';
import Helmet from 'react-helmet';
import { animateScroll } from 'react-scroll';

import {
  debounce,
} from 'utils/streamUtils';

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

import helmetData from '../../../constants/helmetData';

const createSection = id => subtitle => {
  const section = {
    id,
    subtitle,
    content: '',
    isSubtitleEditable: false,
  };
  if (subtitle === '自訂段落' || !subtitle) {
    return {
      ...section,
      subtitle: '',
      isSubtitleEditable: true,
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

    this.leaveAlert = false;
    this.debounceUpdateLeaveAlert = debounce(this.updateLeaveAlert, 3000);
  }

  componentDidUpdate() {
    if (this.leaveAlert) {
      this.debounceUpdateLeaveAlert();
    } else {
      this.updateLeaveAlert();
    }
  }

  onSumbit() {
    const valid = interviewFormCheck(getInterviewForm(this.state));

    if (valid) {
      return postInterviewExperience(portInterviewFormToRequestFormat(getInterviewForm(this.state)));
    }
    this.handleState('submitted')(true);
    animateScroll.scrollToTop();
    return null;
  }

  setLeaveAlert = flag => {
    const router = this.props.router;
    const route = this.props.route;
    if (flag) {
      window.onbeforeunload = () => '您有填寫到一半而未上傳的資訊，確定要離開嗎？';
      router.setRouteLeaveHook(route, () => '您有填寫到一半而未上傳的資訊，確定要離開嗎？');
    } else {
      window.onbeforeunload = null;
      router.setRouteLeaveHook(route, null);
    }
  }

  checkFormEdited = () => {
    const plainFields = [
      'companyQuery',
      'region',
      'jobTitle',
      'experienceInYear',
      'education',
      'interviewTimeYear',
      'interviewTimeMonth',
      'interviewResult',
      'salaryType',
      'salaryAmount',
      'overallRating',
    ];
    if (plainFields.some(key => this.state[key] !== defaultForm[key])) {
      return true;
    }

    let keys = Object.keys(this.state.sections);
    if (keys.length !== 1) {
      return true;
    }
    const section = this.state.sections[keys[0]];
    if (section.subtitle !== '' || section.content !== '') {
      return true;
    }

    keys = Object.keys(this.state.interviewQas);
    if (keys.length !== 1) {
      return true;
    }
    const qa = this.state.interviewQas[keys[0]];
    if (qa.question !== '' || qa.answer !== '') {
      return true;
    }

    if (this.state.interviewSensitiveQuestions.length > 0) {
      return true;
    }

    return false;
  }

  updateLeaveAlert = () => {
    const newLeaveAlert = this.checkFormEdited();
    if (this.leaveAlert !== newLeaveAlert) {
      this.setLeaveAlert(newLeaveAlert);
      this.leaveAlert = newLeaveAlert;
    }
  }

  handleState(key) {
    return value =>
      this.setState({
        [key]: value,
      });
  }

  appendBlock(blockKey) {
    return subtitle => {
      const id = idCounter();
      return this.setState(state => ({
        [blockKey]: {
          ...state[blockKey],
          [id]: createBlock[blockKey](id)(subtitle),
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
        <Helmet {...helmetData.SHARE_INTERVIEW} />
        <h1
          className="headingL"
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
        />
        <SubmitArea
          onSubmit={this.onSumbit}
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default InterviewForm;
