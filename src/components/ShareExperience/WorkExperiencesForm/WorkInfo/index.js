import React, { PropTypes } from 'react';
import subscribeValidation from 'common/subscribeValidation';

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

import {
  companyQuery as companyQueryValidator,
  region as regionValidator,
  jobTitle as jobTitleValidator,
} from '../formCheck';

import { COMPANY, REGION, JOB_TITLE } from '../../../../constants/formElements';

const CompanyQueryWithValidation = subscribeValidation(
  CompanyQuery,
  props => props.validator(props.companyQuery),
  COMPANY,
);

const RegionWithValidation = subscribeValidation(
  Region,
  props => props.validator(props.region),
  REGION,
);

const JobTitleWithValidation = subscribeValidation(
  JobTitle,
  props => props.validator(props.jobTitle),
  JOB_TITLE,
);

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
      submitted,
      changeValidationStatus,
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
            <CompanyQueryWithValidation
              companyQuery={companyQuery}
              onChange={v => {
                handleState('companyQuery')(v);
                handleState('title')(`${v} 工作經驗分享`);
              }}
              onCompanyId={handleState('companyId')}
              validator={companyQueryValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
            />
          </div>
          <div
            style={{
              marginBottom: '41px',
            }}
          >
            <RegionWithValidation
              region={region}
              inputTitle={'工作地區'}
              onChange={handleState('region')}
              validator={regionValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
            />
          </div>
          <div
            style={{
              marginBottom: '41px',
            }}
          >
            <JobTitleWithValidation
              inputTitle="職稱"
              jobTitle={jobTitle}
              onChange={handleState('jobTitle')}
              validator={jobTitleValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
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
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default WorkInfo;
