import React from 'react';
import PropTypes from 'prop-types';

import InterviewQa from './InterviewQa';

const InterviewQas = ({
  interviewQas,
  editQa,
  removeQa,
  submitted,
  validator,
}) => (
  <div>
    {interviewQas.map(qa => (
      <div
        key={qa.id}
        style={{
          marginBottom: '40px',
        }}
      >
        <InterviewQa
          question={qa.question}
          answer={qa.answer}
          editQa={editQa(qa.id)}
          removeQa={() => removeQa(qa.id)}
          isWarning={submitted && !validator(qa)}
        />
      </div>
    ))}
  </div>
);

InterviewQas.propTypes = {
  interviewQas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      question: PropTypes.string,
      answer: PropTypes.string,
    }),
  ),
  editQa: PropTypes.func,
  removeQa: PropTypes.func,
  submitted: PropTypes.bool,
  validator: PropTypes.func,
};

export default InterviewQas;
