import React from 'react';
import styles from './InterviewForm.module.css';

import InterviewInfo from './InterviewInfo';

class InterviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);

    this.state = {
      companyQuery: '',
      region: null,
      jobTitle: '',
      experienceInYear: null,
      education: null,
      interviewTimeYear: null,
      interviewTimeMonth: null,
      interviewResult: null,
      salaryType: null,
      salaryAmount: null,
      overallRating: null,
    };
  }

  handleState(key) {
    return value =>
      this.setState({
        [key]: value,
      });
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
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
