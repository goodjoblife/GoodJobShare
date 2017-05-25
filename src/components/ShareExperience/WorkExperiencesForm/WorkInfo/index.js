import React, { PropTypes } from 'react';

import styles from './WorkInfo.module.css';

class WorkInfo extends React.PureComponent {
  render() {
    // const {} = this.props;

    return (
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <h1
          className="pLBold"
          style={{
            marginBottom: '13px',
          }}
        >
          工作資訊
        </h1>
        <div className={styles.form}>
          <p>WorkInfo</p>
        </div>
      </div>
    );
  }
}

WorkInfo.propTypes = {
  handleState: PropTypes.func,
  companyQuery: PropTypes.string,
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  jobTitle: PropTypes.string,
  experienceInYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  education: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isCurrentlyEmployed: PropTypes.string,
  jobEndingTimeYear: PropTypes.number,
  jobEndingTimeMonth: PropTypes.number,
  salaryType: PropTypes.string,
  salaryAmount: PropTypes.number,
  weekWorkTime: PropTypes.number,
  recommendToOthers: PropTypes.string,
};

export default WorkInfo;
