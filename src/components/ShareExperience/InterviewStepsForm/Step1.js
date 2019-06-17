import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import InterviewInfo from './BasicInfo';
import styles from './InterviewForm.module.css';
import ButtonRect from 'common/button/ButtonRect';

class Step1 extends React.Component {
  static propTypes = {
    handleState: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    changeValidationStatus: PropTypes.func.isRequired,
  };

  render() {
    const { handleState, state, changeValidationStatus, history } = this.props;
    return (
      <React.Fragment>
        <InterviewInfo
          handleState={handleState}
          companyQuery={state.companyQuery}
          region={state.region}
          jobTitle={state.jobTitle}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
        />
        <div className={styles.nextAction}>
          <ButtonRect
            style={{ marginLeft: 'auto' }}
            onClick={() => history.push('/share/interview/step2')}
          >
            下一步
          </ButtonRect>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Step1);
