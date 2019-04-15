import React from 'react';
import PropTypes from 'prop-types';
import InterviewExperience from './InterviewExperience';

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
    } = this.props;

    return (
      <InterviewExperience
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
    );
  }
}

export default Step3;
