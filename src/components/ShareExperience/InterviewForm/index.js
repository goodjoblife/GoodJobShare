import React from 'react';
import R from 'ramda';
import styles from './InterviewForm.module.css';

import InterviewInfo from './InterviewInfo';
import InterviewExperience from './InterviewExperience';

const sortById = R.sortBy(R.prop('id'));

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

const idGenerator = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const idCounter = idGenerator();

const handleBlocks = R.compose(
  sortById,
  R.map(ele => ele[1]),
  R.toPairs
);

const isBlockRemovable = blocks =>
  R.length(R.keys(blocks)) > 1;

class InterviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.appendBlock = this.appendBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
    this.editBlock = this.editBlock.bind(this);

    const firstSectionId = idCounter();
    const firstQaId = idCounter();

    this.state = {
      companyQuery: '',
      region: null,
      jobTitle: '',
      experienceInYear: null,
      education: null,
      interviewTimeYear: null,
      interviewTimeMonth: null,
      interviewResult: null,
      salaryType: 'month',
      salaryAmount: '',
      overallRating: 0,
      title: '',
      sections: {
        [firstSectionId]: createBlock.sections(firstSectionId)(),
      },
      interviewQas: {
        [firstQaId]: createBlock.interviewQas(firstQaId)(),
      },
      interviewSensitiveQuestions: ['詢問家庭狀況'],
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
    return (
      <div className={styles.container}>
        <h1
          className="headingL"
        >
          面試經驗分享
        </h1>
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
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
