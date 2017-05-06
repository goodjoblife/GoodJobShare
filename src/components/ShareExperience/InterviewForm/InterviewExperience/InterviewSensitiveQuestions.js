import React from 'react';
import PropTypes from 'prop-types';

import InputTitle from '../../common/InputTitle';

const InterviewSensitiveQuestions = ({ interviewSensitiveQuestions }) => (
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
      interviewSensitiveQuestions.map(ele =>
        <div
          key={ele}
        >
          {ele}
        </div>
      )
    }
  </div>
);

InterviewSensitiveQuestions.propTypes = {
  interviewSensitiveQuestions: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export default InterviewSensitiveQuestions;
