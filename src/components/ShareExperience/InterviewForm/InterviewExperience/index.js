import React, { Component, PropTypes } from 'react';
import ButtonAdd from 'common/button/ButtonAdd';
import AddButton from 'common/button/AddButton';

import styles from './InterviewExperience.module.css';

import Title from './Title';
import Sections from './Sections';
import InterviewQas from './InterviewQas';

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
      interviewQas,
      appendQa,
      removeQa,
      editQa,
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
          <div
            style={{
              position: 'relative',
              marginBottom: '80px',
            }}
          >
            <Sections
              sections={sections}
              removeSection={removeSection}
              editSection={editSection}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                minWidth: '150%',
                transform: 'translate(-65px, 100%)',
              }}
            >
              <ButtonAdd
                options={interviewSectionSubtitleOptions}
                custimizedValues={[interviewSectionSubtitleOptions[0].value]}
                appendBlock={appendSection}
              />
            </div>
          </div>
          <hr
            style={{
              border: '1px solid #E7E7E7',
            }}
          />
          <div
            style={{
              position: 'relative',
            }}
          >
            <InterviewQas
              interviewQas={interviewQas}
              editQa={editQa}
              removeQa={removeQa}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                transform: 'translateX(-65px)',
              }}
            >
              <AddButton
                onClick={() => appendQa()}
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
  interviewQas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  })),
  appendQa: PropTypes.func,
  removeQa: PropTypes.func,
  editQa: PropTypes.func,
};

export default InterviewExperience;
