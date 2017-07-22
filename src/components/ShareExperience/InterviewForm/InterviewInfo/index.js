import React, { PropTypes } from 'react';
import i from 'common/icons';

import styles from '../../ShareExperience.module.css';

import {
  companyQuery as companyQueryValidator,
  jobTitle as jobTitleValidator,
  region as regionValidator,
  interviewTimeYear as interviewTimeYearValidator,
  interviewTimeMonth as interviewTimeMonthValidator,
  interviewResult as interviewResultValidator,
  overallRating as overallRatingValidator,
} from '../formCheck';

import IconHeading from '../../common/IconHeading';
import CompanyQuery from '../../common/CompanyQuery';
import Region from '../../common/Region';
import JobTitle from '../../common/JobTitle';
import ExperienceInYear from '../../common/ExperienceInYear';
import Education from '../../common/Education';
import InterviewTime from './InterviewTime';
import InterviewResult from './InterviewResult';
import Salary from '../../common/Salary';
import OverallRating from './OverallRating';

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
      overallRating,
      submitted,
      changeValidationStatus,
    } = this.props;

    return (
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <IconHeading text="面試資訊" Icon={i.People} />
        <div className={styles.block}>
          <div
            style={{
              marginBottom: '35px',
            }}
          >
            <CompanyQuery
              companyQuery={companyQuery}
              onChange={v => {
                handleState('companyQuery')(v);
                handleState('title')(`${v} 面試經驗分享`);
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
            <Region
              region={region}
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
            <JobTitle
              inputTitle="應徵職稱"
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
              marginBottom: '64px',
            }}
          >
            <InterviewTime
              interviewTimeYear={interviewTimeYear}
              interviewTimeMonth={interviewTimeMonth}
              onInterviewTimeYear={handleState('interviewTimeYear')}
              onInterviewTimeMonth={handleState('interviewTimeMonth')}
              interviewTimeYearValidator={interviewTimeYearValidator}
              interviewTimeMonthValidator={interviewTimeMonthValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
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
              validator={interviewResultValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
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
          <div>
            <OverallRating
              overallRating={overallRating}
              onChange={handleState('overallRating')}
              validator={overallRatingValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
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
  overallRating: PropTypes.number,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default InterviewInfo;
