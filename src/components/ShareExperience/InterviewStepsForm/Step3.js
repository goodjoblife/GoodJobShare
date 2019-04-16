import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import QAs from './QAs';
import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';
import styles from './InterviewForm.module.css';

class Step3 extends React.Component {
  static propTypes = {
    handleState: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        subtitle: PropTypes.string,
        placeholder: PropTypes.string,
        content: PropTypes.string,
      }),
    ).isRequired,
    appendSection: PropTypes.func.isRequired,
    removeSection: PropTypes.func.isRequired,
    editSection: PropTypes.func.isRequired,
    interviewQas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        subtitle: PropTypes.string,
        content: PropTypes.string,
      }),
    ).isRequired,
    appendQa: PropTypes.func.isRequired,
    removeQa: PropTypes.func.isRequired,
    editQa: PropTypes.func.isRequired,
    changeValidationStatus: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {
      handleState,
      state,
      sections,
      appendSection,
      removeSection,
      editSection,
      interviewQas,
      appendQa,
      removeQa,
      editQa,
      changeValidationStatus,
      onSubmit,
    } = this.props;

    return (
      <React.Fragment>
        {state.submitted ? (
          <div
            style={{
              marginTop: '20px',
            }}
            className={styles.warning__wording}
          >
            oops! 請檢查底下紅框內的內容是否正確
          </div>
        ) : null}
        <Section
          handleState={handleState}
          title={'當時面試過程是如何呢？（＋100 積分）'}
          subtitle="回想一下，不論是流程、對話、工作環境、薪資福利，都可以分享哦！"
          sections={sections}
          appendSection={appendSection}
          removeSection={removeSection}
          editSection={editSection}
          interviewQas={interviewQas}
          appendQa={appendQa}
          removeQa={removeQa}
          editQa={editQa}
          interviewSensitiveQuestions={state.interviewSensitiveQuestions}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
        />
        <QAs
          handleState={handleState}
          title={state.title}
          sections={sections}
          appendSection={appendSection}
          removeSection={removeSection}
          editSection={editSection}
          interviewQas={interviewQas}
          appendQa={appendQa}
          removeQa={removeQa}
          editQa={editQa}
          interviewSensitiveQuestions={state.interviewSensitiveQuestions}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
        />
        <Section
          handleState={handleState}
          title="給其他面試者的中肯建議 （＋100 積分）"
          sections={sections}
          appendSection={appendSection}
          removeSection={removeSection}
          editSection={editSection}
          interviewQas={interviewQas}
          appendQa={appendQa}
          removeQa={removeQa}
          editQa={editQa}
          interviewSensitiveQuestions={state.interviewSensitiveQuestions}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
        />
        <SubmitArea onSubmit={onSubmit} />
      </React.Fragment>
    );
  }
}

export default Step3;
