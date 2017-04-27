import React, { Component, PropTypes } from 'react';
import styles from './InterviewExperience.module.css';

import Title from './Title';

class InterviewExperience extends Component {
  render() {
    const {
      handleState,
      title,
    } = this.props;
    return (
      <div
        style={{
          marginTop: '59px',
        }}
      >
        <h1
          className="pLBold"
          style={{
            marginBottom: '13px',
          }}
        >
          面試經驗
        </h1>
        <div className={styles.form}>
          <div
            style={{
              marginBottom: '50px',
            }}
          >
            <Title
              title={title}
              onChange={handleState('title')}
            />
          </div>
        </div>
      </div>
    );
  }
}

InterviewExperience.propTypes = {
  handleState: PropTypes.func,
  title: PropTypes.string,
};

export default InterviewExperience;
