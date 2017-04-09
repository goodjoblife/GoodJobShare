import React from 'react';
import styles from './InterviewInfo.module.css';

import InputTitle from '../common/InputTitle';

class InterviewInfo extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <h1
          style={{
            marginBottom: '13px',
          }}
        >
          面試資訊
        </h1>
        <div className={styles.form}>
          <InputTitle
            text="公司/單位 或 統一編號"
            must
          />
        </div>
      </div>
    );
  }
}

InterviewInfo.propTypes = {};

export default InterviewInfo;
