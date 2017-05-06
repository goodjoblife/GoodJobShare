import React from 'react';
import R from 'ramda';
import styles from './InterviewForm.module.css';

import InterviewInfo from './InterviewInfo';
import InterviewExperience from './InterviewExperience';

const sortById = R.sortBy(R.prop('id'));

const createSection = id => (subtitle = '請輸入標題，例：面試過程') => ({
  id,
  subtitle,
  content: '',
});

const sectionIdGenerator = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const sectionIdCounter = sectionIdGenerator();


class InterviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.appendSection = this.appendSection.bind(this);
    this.removeSection = this.removeSection.bind(this);
    this.editSection = this.editSection.bind(this);

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
      overallRating: 3,
      title: '',
      sections: [
        createSection(sectionIdCounter())(),
      ],
    };
  }

  handleState(key) {
    return value =>
      this.setState({
        [key]: value,
      });
  }

  appendSection(subtitle) {
    return this.setState(state => ({
      sections: [
        ...state.sections,
        createSection(sectionIdCounter())(subtitle),
      ],
    }));
  }

  removeSection(id) {
    return this.setState(state => ({
      sections: state.sections.filter(
        section => section.id !== id
      ),
    }));
  }

  editSection(id) {
    return key => value =>
      this.setState(state => ({
        sections: [
          ...state.sections.filter(
            section => section.id !== id
          ),
          {
            ...state.sections.find(
              section => section.id === id
            ),
            [key]: value,
          },
        ],
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
          sections={sortById(this.state.sections)}
          appendSection={this.appendSection}
          removeSection={this.removeSection}
          editSection={this.editSection}
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
