import React from 'react';
import PropTypes from 'prop-types';
import InterviewInfo from './InterviewInfo';

class Step1 extends React.Component {
  static propTypes = {
    handleState: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    changeValidationStatus: PropTypes.func.isRequired,
  };

  render() {
    const { handleState, state, changeValidationStatus } = this.props;
    return (
      <InterviewInfo
        handleState={handleState}
        companyQuery={state.companyQuery}
        region={state.region}
        jobTitle={state.jobTitle}
        experienceInYear={state.experienceInYear}
        education={state.education}
        interviewTimeYear={state.interviewTimeYear}
        interviewTimeMonth={state.interviewTimeMonth}
        interviewResult={state.interviewResult}
        salaryType={state.salaryType}
        salaryAmount={state.salaryAmount}
        overallRating={state.overallRating}
        submitted={state.submitted}
        changeValidationStatus={changeValidationStatus}
      />
    );
  }
}

export default Step1;
