import React from 'react';
import PropTypes from 'prop-types';
import InterviewInfo from './MoreInfo';
import styles from './InterviewForm.module.css';

class Step2 extends React.Component {
  static propTypes = {
    handleState: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    changeValidationStatus: PropTypes.func.isRequired,
  };

  render() {
    const { handleState, state, changeValidationStatus } = this.props;
    return (
      <React.Fragment>
        {state.submitted ? (
          <div
            style={{
              marginTop: '20px',
            }}
            className={styles.warning__wording}
          >
            oops! 請檢查底下紅框內的內容是否正確
          </div>
        ) : null}
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
      </React.Fragment>
    );
  }
}

export default Step2;
