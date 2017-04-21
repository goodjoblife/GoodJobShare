import React, { PropTypes } from 'react';

import styles from './InterviewInfo.module.css';

import CompanyQuery from './CompanyQuery';
import Region from './Region';
import JobTitle from './JobTitle';
import ExperienceInYear from './ExperienceInYear';
import Education from './Education';
import InterviewTime from './InterviewTime';
import InterviewResult from './InterviewResult';
import Salary from './Salary';

class InterviewInfo extends React.PureComponent {
  render() {
    const {
      handleState,
      companyQuery,
      region,
      jobTitle,
      experienceInYear,
      education,
      interviewTimeYear,
      interviewTimeMonth,
      interviewResult,
      salaryType,
      salaryAmount,
    } = this.props;

    return (
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <h1
          className="pLBold"
          style={{
            marginBottom: '13px',
          }}
        >
          面試資訊
        </h1>
        <div className={styles.form}>
          <div
            style={{
              marginBottom: '35px',
            }}
          >
            <CompanyQuery
              companyQuery={companyQuery}
              onChange={handleState('companyQuery')}
            />
          </div>
          <div
            style={{
              marginBottom: '41px',
            }}
          >
            <Region
              region={region}
              onChange={handleState('region')}
            />
          </div>
          <div
            style={{
              marginBottom: '41px',
            }}
          >
            <JobTitle
              jobTitle={jobTitle}
              onChange={handleState('jobTitle')}
            />
          </div>
          <div
            style={{
              marginBottom: '52px',
            }}
          >
            <ExperienceInYear
              experienceInYear={experienceInYear}
              onChange={handleState('experienceInYear')}
            />
          </div>
          <div
            style={{
              marginBottom: '64px',
            }}
          >
            <Education
              education={education}
              onChange={handleState('education')}
            />
          </div>
          <div
            style={{
              marginBottom: '60px',
            }}
          >
            <InterviewTime
              interviewTimeYear={interviewTimeYear}
              interviewTimeMonth={interviewTimeMonth}
              onInterviewTimeYear={handleState('interviewTimeYear')}
              onInterviewTimeMonth={handleState('interviewTimeMonth')}
            />
          </div>
          <div
            style={{
              marginBottom: '53px',
            }}
          >
            <InterviewResult
              interviewResult={interviewResult}
              onChange={handleState('interviewResult')}
            />
          </div>
          <div
            style={{
              marginBottom: '57px',
            }}
          >
            <Salary
              salaryType={salaryType}
              salaryAmount={salaryAmount}
              onSalaryType={handleState('salaryType')}
              onSalaryAmount={handleState('salaryAmount')}
            />
          </div>
        </div>
      </div>
    );
  }
}

InterviewInfo.propTypes = {
  companyQuery: PropTypes.string,
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  jobTitle: PropTypes.string,
  handleState: PropTypes.func,
  experienceInYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  education: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewTimeYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewTimeMonth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewResult: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salaryType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salaryAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default InterviewInfo;
