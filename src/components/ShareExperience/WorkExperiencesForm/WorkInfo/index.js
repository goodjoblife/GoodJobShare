import React from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import People from 'common/icons/People';
import IconHeadingBlock from 'common/IconHeadingBlock';

import FormGroup from '../../common/FormGroup';
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

import { COMPANY, REGION, JOB_TITLE } from 'constants/formElements';

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
      <IconHeadingBlock heading="工作資訊" Icon={People} requiredText>
        <FormGroup>
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
        </FormGroup>
        <FormGroup>
          <RegionWithValidation
            region={region}
            inputTitle={'工作地區'}
            onChange={handleState('region')}
            validator={regionValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </FormGroup>
        <FormGroup>
          <JobTitleWithValidation
            inputTitle="職稱"
            jobTitle={jobTitle}
            onChange={handleState('jobTitle')}
            validator={jobTitleValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </FormGroup>
        <FormGroup>
          <ExperienceInYear
            experienceInYear={experienceInYear}
            onChange={handleState('experienceInYear')}
          />
        </FormGroup>
        <FormGroup>
          <Education
            education={education}
            onChange={handleState('education')}
          />
        </FormGroup>
        <FormGroup>
          <IsEmployed
            isCurrentlyEmployed={isCurrentlyEmployed}
            jobEndingTimeYear={jobEndingTimeYear}
            jobEndingTimeMonth={jobEndingTimeMonth}
            onIsCurrentlyEmployed={handleState('isCurrentlyEmployed')}
            onJobEndingTimeYear={handleState('jobEndingTimeYear')}
            onJobEndingTimeMonth={handleState('jobEndingTimeMonth')}
          />
        </FormGroup>
        <FormGroup>
          <Salary
            salaryType={salaryType}
            salaryAmount={salaryAmount}
            onSalaryType={handleState('salaryType')}
            onSalaryAmount={handleState('salaryAmount')}
          />
        </FormGroup>
        <FormGroup>
          <WeekWorkTime
            weekWorkTime={weekWorkTime}
            onChange={handleState('weekWorkTime')}
          />
        </FormGroup>
        <FormGroup>
          <RecommendToOthers
            recommendToOthers={recommendToOthers}
            onChange={handleState('recommendToOthers')}
          />
        </FormGroup>
      </IconHeadingBlock>
    );
  }
}

WorkInfo.propTypes = {
  handleState: PropTypes.func,
  companyQuery: PropTypes.string,
  region: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  jobTitle: PropTypes.string,
  experienceInYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  education: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCurrentlyEmployed: PropTypes.string,
  jobEndingTimeYear: PropTypes.number,
  jobEndingTimeMonth: PropTypes.number,
  salaryType: PropTypes.string,
  salaryAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weekWorkTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  recommendToOthers: PropTypes.string,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default WorkInfo;
