import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import InputTitle from '../../common/InputTitle';

const monthMap = Array(12).fill(0).map((_, index) => ({
  label: index + 1,
  value: index + 1,
}));

const yearMap = Array(12).fill(0).map((_, index) => ({
  label: new Date().getFullYear() - index,
  value: new Date().getFullYear() - index,
}));

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
            options={yearMap}
            value={interviewTimeYear}
            onChange={
              e => onInterviewTimeYear(Number(e.target.value))
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
            options={monthMap}
            value={interviewTimeMonth}
            onChange={
              e => onInterviewTimeMonth(Number(e.target.value))
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
