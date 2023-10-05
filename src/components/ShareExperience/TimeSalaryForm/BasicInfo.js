import React from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Select from 'common/form/Select';
import TextInput from 'common/form/TextInput';

import CompanyQuery from '../common/CompanyQuery';
import IsEmployed from '../WorkExperiencesForm/WorkInfo/IsEmployed';
import JobTitle from '../common/JobTitle';
import EmploymentType from '../common/EmploymentType';
import InputTitle from '../common/InputTitle';

import styles from './TimeSalaryForm.module.css';

import {
  company as companyValidator,
  jobTitle as jobTitleValidator,
  employmentType as employmentTypeValidator,
} from './formCheck';

import { COMPANY, JOB_TITLE, EMPLOYMENT_TYPE } from 'constants/formElements';

const CompanyWithValidation = subscribeValidation(
  CompanyQuery,
  props => props.validator(props.companyQuery),
  COMPANY,
);

const JobTitleWithValidation = subscribeValidation(
  JobTitle,
  props => props.validator(props.jobTitle),
  JOB_TITLE,
);

const EmploymentTypeWithValidation = subscribeValidation(
  EmploymentType,
  props => props.validator(props.employmentType),
  EMPLOYMENT_TYPE,
);

const BasicInfo = ({
  handleState,
  company,
  isCurrentlyEmployed,
  jobEndingTimeYear,
  jobEndingTimeMonth,
  jobTitle,
  sector,
  employmentType,
  gender,
  submitted,
  changeValidationStatus,
}) => {
  return (
    <div>
      <div className={styles.formSection}>
        <div className={styles.formGroupTwo}>
          <CompanyWithValidation
            companyQuery={company}
            onChange={handleState('company')}
            onCompanyId={handleState('companyId')}
            validator={companyValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroupTwo}>
          <IsEmployed
            idPrefix4Radio="timeSalary"
            isCurrentlyEmployed={isCurrentlyEmployed}
            jobEndingTimeYear={jobEndingTimeYear}
            jobEndingTimeMonth={jobEndingTimeMonth}
            onIsCurrentlyEmployed={handleState('isCurrentlyEmployed')}
            onJobEndingTimeYear={handleState('jobEndingTimeYear')}
            onJobEndingTimeMonth={handleState('jobEndingTimeMonth')}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroupTwo}>
          <div className={styles.formGroup}>
            <JobTitleWithValidation
              inputTitle="職稱"
              jobTitle={jobTitle}
              onChange={handleState('jobTitle')}
              validator={jobTitleValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
            />
          </div>
          <div className={styles.formGroup}>
            <InputTitle text="廠區/門市/分公司" />
            <TextInput
              value={sector}
              placeholder="楠梓廠區  研發部"
              onChange={e => handleState('sector')(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroupTwo}>
          <div className={styles.formGroup}>
            <EmploymentTypeWithValidation
              employmentType={employmentType}
              inputTitle={'職務型態'}
              onChange={handleState('employmentType')}
              validator={employmentTypeValidator}
              submitted={submitted}
              changeValidationStatus={changeValidationStatus}
            />
          </div>
          <div className={styles.formGroup}>
            <InputTitle text="性別" />
            <Select
              value={gender}
              options={[
                {
                  label: '男',
                  value: 'male',
                },
                {
                  label: '女',
                  value: 'female',
                },
                {
                  label: '其他',
                  value: 'other',
                },
              ]}
              onChange={e => handleState('gender')(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

BasicInfo.propTypes = {
  handleState: PropTypes.func,
  company: PropTypes.string,
  isCurrentlyEmployed: PropTypes.string,
  jobEndingTimeYear: PropTypes.number,
  jobEndingTimeMonth: PropTypes.number,
  jobTitle: PropTypes.string,
  sector: PropTypes.string,
  employmentType: PropTypes.string,
  gender: PropTypes.string,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default BasicInfo;
