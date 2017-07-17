import React from 'react';
import R from 'ramda';
import Helmet from 'react-helmet';
import { animateScroll } from 'react-scroll';

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

import styles from './WorkExperiencesForm.module.css';

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
  region: null,
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
    this.onSumbit = this.onSumbit.bind(this);

    this.state = {
      ...defaultForm,
      submitted: false,
    };
  }

  onSumbit() {
    const valid = workExperiencesFormCheck(propsWorkExperiencesForm(this.state));

    if (valid) {
      return postWorkExperience(workExperiencesToBody(this.state));
    }
    this.handleState('submitted')(true);
    animateScroll.scrollToTop();
    return null;
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
          [id]: createBlock.sections(id)(subtitle),
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
      <div className={styles.container}>
        <Helmet {...helmetData.SHARE_WORK} />
        <h1
          className="headingL"
        >
          工作經驗分享
        </h1>
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
        />
        <WorkExperience
          handleState={this.handleState}
          title={title}
          sections={handleBlocks(sections)}
          appendSection={this.appendBlock('sections')}
          removeSection={this.removeBlock('sections')}
          editSection={this.editBlock('sections')}
          submitted={submitted}
        />
        <SubmitArea
          onSubmit={this.onSumbit}
        />
      </div>
    );
  }
}

export default WorkExperiencesForm;
