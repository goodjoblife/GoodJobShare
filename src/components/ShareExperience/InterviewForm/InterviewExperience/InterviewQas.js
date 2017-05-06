import React, { PropTypes } from 'react';

import interviewQa from './InterviewQa';

const InterviewQas = ({ interviewQas }) => (
  <div>
    {
      interviewQas.map(qa =>
        <div
          key={qa.id}
          style={{
            marginBottom: '40px',
          }}
        >
          <interviewQa
            question={qa.question}
            answer={qa.answer}
          />
        </div>
      )
    }
  </div>
);

InterviewQas.propTypes = {
  interviewQas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string,
  })),
};

export default InterviewQas;
