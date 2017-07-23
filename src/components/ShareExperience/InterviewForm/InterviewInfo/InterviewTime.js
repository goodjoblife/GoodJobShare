import React, { PropTypes } from 'react';
import cn from 'classnames';

import Select from 'common/form/Select';
import InputTitle from '../../common/InputTitle';

import styles from './InterviewTime.module.css';

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
    interviewTimeYearValidator,
    interviewTimeMonthValidator,
    submitted,
  }
) => {
  const yearInvalid = !interviewTimeYearValidator(interviewTimeYear);
  const monthInvalid = !interviewTimeMonthValidator(interviewTimeMonth);
  const yearWording = yearInvalid ? '年份' : null;
  const monthWording = monthInvalid ? '月份' : null;

  let warningWordingArray = [
    yearWording,
    monthWording,
  ];

  warningWordingArray = warningWordingArray.filter(n => n);

  const isWarning = submitted && (yearInvalid || monthInvalid);
  return (
    <div>
      <InputTitle
        text="面試時間"
        must
      />
      <div
        style={{
          display: 'flex',
        }}
        className={isWarning ? styles.warning : ''}
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
      {
        isWarning ?
          <p
            className={cn(styles.warning__wording, 'pS')}
            style={{
              marginTop: '8px',
            }}
          >
            {`需填寫面試${warningWordingArray.join(' 及 ')}`}
          </p>
          : null
      }
    </div>
  );
};

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
  interviewTimeYearValidator: PropTypes.func,
  interviewTimeMonthValidator: PropTypes.func,
  submitted: PropTypes.bool,
};

export default InterviewTime;
