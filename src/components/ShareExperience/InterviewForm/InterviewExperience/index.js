import React, { Component, PropTypes } from 'react';
import styles from './InterviewExperience.module.css';

import Title from './Title';
import Sections from './Sections';

class InterviewExperience extends Component {
  render() {
    const {
      handleState,
      title,
      sections,
      appendSection,
      removeSection,
      editSection,
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
          <div>
            <Sections
              sections={sections}
              appendSection={appendSection}
              removeSection={removeSection}
              editSection={editSection}
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
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  })),
  appendSection: PropTypes.func,
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
};

export default InterviewExperience;
