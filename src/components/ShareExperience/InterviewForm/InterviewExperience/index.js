import React, { Component, PropTypes } from 'react';
import ButtonAdd from 'common/button/ButtonAdd';
import AddButton from 'common/button/AddButton';
import i from 'common/icons';

import styles from '../../ShareExperience.module.css';

import IconHeading from '../../common/IconHeading';
import Title from '../../common/Title';
import Sections from '../../common/Sections';
import InterviewQas from './InterviewQas';
import InterviewSensitiveQuestions from './InterviewSensitiveQuestions';

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
      interviewSensitiveQuestions,
    } = this.props;
    return (
      <div
        style={{
          marginTop: '59px',
        }}
      >
        <IconHeading text="面試經驗" Icon={i.Comment2} />
        <div
          className={styles.block}
        >
          <div
            style={{
              marginBottom: '50px',
            }}
          >
            <Title
              title={title}
              onChange={handleState('title')}
              placeholder="ＯＯ 股份有限公司面試經驗分享"
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
                disabledValues={sections.map(section => section.subtitle)}
                appendBlock={appendSection}
              />
            </div>
          </div>
          <hr
            style={{
              border: '1px solid #E7E7E7',
              marginBottom: '35px',
            }}
          />
          <div
            style={{
              position: 'relative',
              marginBottom: '80px',
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
                bottom: 0,
                transform: 'translate(-65px, 100%)',
              }}
            >
              <AddButton
                onClick={() => appendQa()}
              />
            </div>
          </div>
          <hr
            style={{
              border: '1px solid #E7E7E7',
              marginBottom: '35px',
            }}
          />
          <div>
            <InterviewSensitiveQuestions
              interviewSensitiveQuestions={interviewSensitiveQuestions}
              onChange={handleState('interviewSensitiveQuestions')}
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
  interviewQas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  })),
  appendQa: PropTypes.func,
  removeQa: PropTypes.func,
  editQa: PropTypes.func,
  interviewSensitiveQuestions: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export default InterviewExperience;
