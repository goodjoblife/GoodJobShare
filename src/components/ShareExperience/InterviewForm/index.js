import React from 'react';
import styles from './InterviewForm.module.css';

import InterviewInfo from './InterviewInfo';

class InterviewForm extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <h1
          className="headingL"
        >
          面試經驗分享
        </h1>
        <InterviewInfo />
      </div>
    );
  }
}

InterviewForm.propTypes = {};

export default InterviewForm;
