import React from 'react';
import styles from './InterviewInfo.module.css';

class InterviewInfo extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>面試資訊</h1>
        <div className={styles.form}>
          Form Body
        </div>
      </div>
    );
  }
}

InterviewInfo.propTypes = {};

export default InterviewInfo;
