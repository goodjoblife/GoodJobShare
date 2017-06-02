import React from 'react';
import R from 'ramda';

import SubmitArea from '../common/SubmitArea';

import WorkInfo from './WorkInfo';
import WorkExperience from './WorkExperience';

import {
  idGenerator,
  handleBlocks,
  workExperiencesToBody,
} from '../utils';

import {
  postWorkExperience,
} from '../../../apis/workExperiencesApi';

import styles from './WorkExperiencesForm.module.css';

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
  region: null,
  jobTitle: '',
  experienceInYear: null,
  education: null,
  isCurrentlyEmployed: 'yes',
  jobEndingTimeYear: null,
  jobEndingTimeMonth: null,
  salaryType: 'month',
  salaryAmount: 0,
  weekWorkTime: '',
  recommendToOthers: null,
  overallRating: 0,
  title: '',
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

    this.state = {
      ...defaultForm,
    };
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
    } = this.state;

    return (
      <div className={styles.container}>
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
        />
        <WorkExperience
          handleState={this.handleState}
          title={title}
          sections={handleBlocks(sections)}
          appendSection={this.appendBlock('sections')}
          removeSection={this.removeBlock('sections')}
          editSection={this.editBlock('sections')}
        />
        <SubmitArea
          onSubmit={() => postWorkExperience(workExperiencesToBody(this.state))}
          submitable
        />
      </div>
    );
  }
}

export default WorkExperiencesForm;
