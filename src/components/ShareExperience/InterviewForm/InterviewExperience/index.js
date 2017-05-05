import React, { Component, PropTypes } from 'react';
import ButtonAdd from 'common/button/ButtonAdd';

import styles from './InterviewExperience.module.css';

import Title from './Title';
import Sections from './Sections';

import {
  interviewSectionSubtitleOptions,
} from '../../common/optionMap';

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
        <div
          className={styles.form}
          style={{
            position: 'relative',
          }}
        >
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
              removeSection={removeSection}
              editSection={editSection}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                transform: 'translateX(-16px)',
              }}
            >
              <ButtonAdd
                options={interviewSectionSubtitleOptions}
                custimizedValues={[interviewSectionSubtitleOptions[0].value]}
                appendSection={appendSection}
              />
            </div>
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
