import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Section from './Section';
import QAs from './QAs';
import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';
import {
  EXPERIENCE_SECTION,
  SUGGESTION_SECTION,
} from '../../../constants/formElements';

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
        <Section
          heading={'當時面試過程是如何呢？（＋100 積分）'}
          section={sections[0]}
          subHeading="回想一下，不論是流程、對話、工作環境、薪資福利，都可以分享哦！"
          contentMinLength={30}
          editSection={editSection}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
          elementName={EXPERIENCE_SECTION}
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
          heading="給其他面試者的中肯建議 （＋100 積分）"
          section={sections[1]}
          contentMinLength={30}
          editSection={editSection}
          submitted={state.submitted}
          changeValidationStatus={changeValidationStatus}
          elementName={SUGGESTION_SECTION}
        />
        <SubmitArea onSubmit={onSubmit} />
      </React.Fragment>
    );
  }
}

export default withRouter(Step3);
