import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import InputTitle from '../../common/InputTitle';

import {
  educationOptions,
} from '../../common/optionMap';

const InterviewTime = (
  { 
    interviewTimeYear,
    interviewTimeMonth,
    onInterviewTimeYear,
    onInterviewTimeMonth,
  }
) => (
  <div>
    <InputTitle
      text="面試時間"
      must
    />
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          marginRight: '35px',
        }}
      >
        <div
          style={{
            width: '110px',
            display: 'inline-block',
            marginRight: '11px',
          }}
        >
          <Select
            options={educationOptions}
            value={interviewTimeYear}
            onChange={
              e => onInterviewTimeYear(e.target.value)
            }
          />
        </div>
        <p
          className="pS"
          style={{
            display: 'inline-block',
          }}
        >
          年
        </p>
      </div>
      <div>
        <div
          style={{
            width: '110px',
            display: 'inline-block',
            marginRight: '11px',
          }}
        >
          <Select
            options={educationOptions}
            value={interviewTimeMonth}
            onChange={
              e => onInterviewTimeMonth(e.target.value)
            }
          />
        </div>
        <p
          className="pS"
          style={{
            display: 'inline-block',
          }}
        >
          月
        </p>
      </div>
    </div>
  </div>
);

InterviewTime.propTypes = {
  interviewTimeYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewTimeMonth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onInterviewTimeYear: PropTypes.func,
  onInterviewTimeMonth: PropTypes.func,
};

export default InterviewTime;
