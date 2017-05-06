import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from 'common/button/ButtonGroup';

import InputTitle from '../../common/InputTitle';

import {
  interviewSensitiveQuestionsMap,
} from '../../common/optionMap';

const InterviewSensitiveQuestions = ({ interviewSensitiveQuestions, onChange }) => (
  <div>
    <div
      style={{
        display: 'flex',
        marginBottom: '15px',
      }}
    >
      <InputTitle
        text="是否有以下特殊問題"
      />
      <p
        style={{
          color: '#6E6E6E',
          fontSize: '0.8125rem',
        }}
      >
        都沒有請留空
      </p>
    </div>
    {
      <ButtonGroup
        value={interviewSensitiveQuestions}
        options={interviewSensitiveQuestionsMap}
        onChange={onChange}
      />
    }
  </div>
);

InterviewSensitiveQuestions.propTypes = {
  interviewSensitiveQuestions: PropTypes.arrayOf(
    PropTypes.string,
  ),
  onChange: PropTypes.func,
};

export default InterviewSensitiveQuestions;
