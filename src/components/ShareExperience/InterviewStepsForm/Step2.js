import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import InterviewInfo from './MoreInfo';
import styles from './InterviewForm.module.css';
import ButtonRect from 'common/button/ButtonRect';

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
        <InterviewInfo
          handleState={handleState}
          jobTitle={state.jobTitle}
          experienceInYear={state.experienceInYear}
          interviewTimeYear={state.interviewTimeYear}
          interviewTimeMonth={state.interviewTimeMonth}
          interviewResult={state.interviewResult}
          salaryType={state.salaryType}
          salaryAmount={state.salaryAmount}
          overallRating={state.overallRating}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
        />
        <div className={styles.nextAction}>
          <ButtonRect className={styles.backButton} to="/share/interview/step1">
            上一步
          </ButtonRect>
          <ButtonRect to="/share/interview/step3">下一步</ButtonRect>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Step2);
