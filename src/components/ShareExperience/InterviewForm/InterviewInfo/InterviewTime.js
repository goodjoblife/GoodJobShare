import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Element as ScrollElement } from 'react-scroll';

import Select from 'common/form/Select';
import InputTitle from '../../common/InputTitle';

import styles from './InterviewTime.module.css';

import { VALID, INVALID, INTERVIEW_TIME } from '../../../../constants/formElements';

const monthMap = Array(12).fill(0).map((_, index) => ({
  label: index + 1,
  value: index + 1,
}));

const yearMap = Array(12).fill(0).map((_, index) => ({
  label: new Date().getFullYear() - index,
  value: new Date().getFullYear() - index,
}));

class InterviewTime extends React.Component {
  constructor(props) {
    super(props);
    const isValid = (props.interviewTimeYearValidator(props.interviewTimeYear) &&
                     props.interviewTimeMonthValidator(props.interviewTimeMonth));
    props.changeValidationStatus(INTERVIEW_TIME, isValid ? VALID : INVALID);
    this.state = {
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = (this.props.interviewTimeYearValidator(nextProps.interviewTimeYear) &&
                    this.props.interviewTimeMonthValidator(nextProps.interviewTimeMonth));
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      const status = isValid ? VALID : INVALID;
      this.props.changeValidationStatus(INTERVIEW_TIME, status);
    }
  }

  render() {
    const {
      interviewTimeYear,
      interviewTimeMonth,
      onInterviewTimeYear,
      onInterviewTimeMonth,
      submitted,
    } = this.props;
    const isWarning = submitted && !this.state.isValid;

    return (
      <div>
        <ScrollElement name={INTERVIEW_TIME} />
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
              需填寫面試時間
              </p>
            : null
        }
      </div>
    );
  }
}

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
  changeValidationStatus: PropTypes.func,
};

export default InterviewTime;
