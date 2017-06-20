import React, { PropTypes } from 'react';

import styles from './WorkInfo.module.css';

import CompanyQuery from '../../common/CompanyQuery';
import Region from '../../common/Region';
import JobTitle from '../../common/JobTitle';
import ExperienceInYear from '../../common/ExperienceInYear';
import Education from '../../common/Education';
import Salary from '../../common/Salary';

import IsEmployed from './IsEmployed';
import WeekWorkTime from './WeekWorkTime';
import RecommendToOthers from './RecommendToOthers';

class WorkInfo extends React.PureComponent {
  render() {
    const {
      handleState,
      companyQuery,
      region,
      jobTitle,
      experienceInYear,
      education,
      isCurrentlyEmployed,
      jobEndingTimeYear,
      jobEndingTimeMonth,
      salaryType,
      salaryAmount,
      recommendToOthers,
      weekWorkTime,
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
          工作資訊
        </h1>
        <div className={styles.form}>
          <div
            style={{
              marginBottom: '35px',
            }}
          >
            <CompanyQuery
              companyQuery={companyQuery}
              onChange={v => {
                handleState('companyQuery')(v);
                handleState('title')(`${v} 工作經驗分享`);
              }}
              onCompanyId={handleState('companyId')}
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
              inputTitle="職稱"
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
              marginBottom: '47px',
            }}
          >
            <IsEmployed
              isCurrentlyEmployed={isCurrentlyEmployed}
              jobEndingTimeYear={jobEndingTimeYear}
              jobEndingTimeMonth={jobEndingTimeMonth}
              onIsCurrentlyEmployed={handleState('isCurrentlyEmployed')}
              onJobEndingTimeYear={handleState('jobEndingTimeYear')}
              onJobEndingTimeMonth={handleState('jobEndingTimeMonth')}
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
          <div
            style={{
              marginBottom: '36px',
            }}
          >
            <WeekWorkTime
              weekWorkTime={weekWorkTime}
              onChange={handleState('weekWorkTime')}
            />
          </div>
          <div>
            <RecommendToOthers
              recommendToOthers={recommendToOthers}
              onChange={handleState('recommendToOthers')}
            />
          </div>
        </div>
      </div>
    );
  }
}

WorkInfo.propTypes = {
  handleState: PropTypes.func,
  companyQuery: PropTypes.string,
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  jobTitle: PropTypes.string,
  experienceInYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  education: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isCurrentlyEmployed: PropTypes.string,
  jobEndingTimeYear: PropTypes.number,
  jobEndingTimeMonth: PropTypes.number,
  salaryType: PropTypes.string,
  salaryAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  weekWorkTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  recommendToOthers: PropTypes.string,
};

export default WorkInfo;
