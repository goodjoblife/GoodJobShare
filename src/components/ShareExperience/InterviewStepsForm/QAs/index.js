import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'common/button/Button';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import InterviewQas from './InterviewQas';
import InterviewSensitiveQuestions from './InterviewSensitiveQuestions';

import { interviewSensitiveQuestions as interviewSensitiveQuestionsValidator } from '../formCheck';

import { INTERVIEW_SENSITIVE_QUESTIONS } from '../../../../constants/formElements';

const InterviewSensitiveQuestionsWithValidation = subscribeValidation(
  InterviewSensitiveQuestions,
  props => props.validator(props.interviewSensitiveQuestions),
  INTERVIEW_SENSITIVE_QUESTIONS,
);

class QAs extends Component {
  render() {
    const {
      handleState,
      interviewQas,
      appendQa,
      removeQa,
      editQa,
      interviewSensitiveQuestions,
      submitted,
      changeValidationStatus,
    } = this.props;
    return (
      <Block
        style={{ marginBottom: 34 }}
        heading="面試中問了什麼問題呢？（每題 ＋50 積分）"
      >
        <div
          style={{
            position: 'relative',
            marginBottom: '32px',
          }}
        >
          <InterviewQas
            interviewQas={interviewQas}
            editQa={editQa}
            removeQa={removeQa}
          />
          <Button
            circleSize="md"
            btnStyle="blackLine"
            onClick={() => appendQa()}
          >
            增加一題
          </Button>
        </div>
        <hr
          style={{
            border: '1px solid #E7E7E7',
            marginBottom: '35px',
          }}
        />
        <div>
          <InterviewSensitiveQuestionsWithValidation
            interviewSensitiveQuestions={interviewSensitiveQuestions}
            onChange={handleState('interviewSensitiveQuestions')}
            submitted={submitted}
            validator={interviewSensitiveQuestionsValidator}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
      </Block>
    );
  }
}

QAs.propTypes = {
  handleState: PropTypes.func,
  title: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      subtitle: PropTypes.string,
      placeholder: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  appendSection: PropTypes.func,
  removeSection: PropTypes.func,
  editSection: PropTypes.func,
  interviewQas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      subtitle: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  appendQa: PropTypes.func,
  removeQa: PropTypes.func,
  editQa: PropTypes.func,
  interviewSensitiveQuestions: PropTypes.arrayOf(PropTypes.string),
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default QAs;
