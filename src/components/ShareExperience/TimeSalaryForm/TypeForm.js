import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';

import {
  createCompanyQuestion,
  createJobTitleQuestion,
  createCurrentlyEmployedQuestion,
  createEmployTypeQuestion,
  createSectorQuestion,
  createGenderQuestion,
  createRequiredSalaryQuestion,
  createExperienceInYearQuestion,
  createDayPromisedWorkTimeQuestion,
  createDayRealWorkTimeQuestion,
  createWeekWorkTimeQuestion,
  createOvertimeFrequencyQuestion,
  createOvertimeSalaryQuestion,
  createCompensatoryDayOffQuestion,
  createSubmitQuestion,
} from '../questionCreators';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_CURRENTLY_EMPLOYED,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_SECTOR,
  DATA_KEY_EMPLOY_TYPE,
  DATA_KEY_GENDER,
  DATA_KEY_SALARY,
  DATA_KEY_EXPERIENCE_IN_YEAR,
  DATA_KEY_DAY_PROMISED_WORK_TIME,
  DATA_KEY_DAY_REAL_WORK_TIME,
  DATA_KEY_WEEK_WORK_TIME,
  DATA_KEY_OVERTIME_FREQUENCY,
  DATA_KEY_HAS_OVERTIME_SALARY,
  DATA_KEY_HAS_COMPENSATORY_DAYOFF,
} from '../constants';

import { evolve } from '../utils';
import { tabType } from '../../../constants/companyJobTitle';

import { createSalaryWorkTime } from 'actions/timeAndSalary';
import { transferKeyToSnakecase } from 'utils/objectUtil';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';

const header = <Header title="請輸入你的一份薪資工時" />;

const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="薪時"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);

const questions = [
  createCompanyQuestion({ header }),
  createJobTitleQuestion({ header }),
  createCurrentlyEmployedQuestion(),
  createSectorQuestion(),
  createEmployTypeQuestion(),
  createGenderQuestion(),
  createRequiredSalaryQuestion(),
  createExperienceInYearQuestion(),
  createDayPromisedWorkTimeQuestion(),
  createDayRealWorkTimeQuestion(),
  createWeekWorkTimeQuestion(),
  createOvertimeFrequencyQuestion(),
  createOvertimeSalaryQuestion(),
  createCompensatoryDayOffQuestion(),
  createSubmitQuestion({ type: tabType.TIME_AND_SALARY }),
];

const bodyFromDraft = evolve({
  company: draft => draft[DATA_KEY_COMPANY_NAME],
  companyId: '',
  isCurrentlyEmployed: draft => draft[DATA_KEY_CURRENTLY_EMPLOYED][0],
  jobEndingTimeYear: draft =>
    draft[DATA_KEY_CURRENTLY_EMPLOYED][0] === 'no'
      ? draft[DATA_KEY_CURRENTLY_EMPLOYED][1][0].toString()
      : null,
  jobEndingTimeMonth: draft =>
    draft[DATA_KEY_CURRENTLY_EMPLOYED][0] === 'no'
      ? draft[DATA_KEY_CURRENTLY_EMPLOYED][1][1].toString()
      : null,
  jobTitle: draft => draft[DATA_KEY_JOB_TITLE],
  sector: draft => draft[DATA_KEY_SECTOR],
  employmentType: draft => draft[DATA_KEY_EMPLOY_TYPE],
  gender: draft => draft[DATA_KEY_GENDER],
  email: '',
  salaryType: draft => draft[DATA_KEY_SALARY][0],
  salaryAmount: draft => draft[DATA_KEY_SALARY][1],
  experienceInYear: draft => draft[DATA_KEY_EXPERIENCE_IN_YEAR],
  dayPromisedWorkTime: draft => draft[DATA_KEY_DAY_PROMISED_WORK_TIME],
  dayRealWorkTime: draft => draft[DATA_KEY_DAY_REAL_WORK_TIME],
  weekWorkTime: draft => draft[DATA_KEY_WEEK_WORK_TIME],
  overtimeFrequency: draft => draft[DATA_KEY_OVERTIME_FREQUENCY],
  hasOvertimeSalary: draft => draft[DATA_KEY_HAS_OVERTIME_SALARY][0],
  isOvertimeSalaryLegal: draft => draft[DATA_KEY_HAS_OVERTIME_SALARY][1],
  hasCompensatoryDayoff: draft => draft[DATA_KEY_HAS_COMPENSATORY_DAYOFF],
});

const TypeForm = ({ open, onClose }) => {
  useEffect(() => {
    ReactPixel.track('InitiateCheckout', {
      content_category: PIXEL_CONTENT_CATEGORY.VISIT_TIME_AND_SALARY_FORM,
    });

    // send to GA for tracking conversion rate
    ReactGA.event({
      category: GA_CATEGORY.SHARE_TIME_SALARY,
      action: GA_ACTION.START_WRITING,
    });
  }, []);

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    async draft => {
      const body = transferKeyToSnakecase(bodyFromDraft(draft));
      await dispatch(
        createSalaryWorkTime({
          body,
        }),
      );

      ReactGA.event({
        category: GA_CATEGORY.SHARE_TIME_SALARY,
        action: GA_ACTION.UPLOAD_SUCCESS,
      });
      ReactPixel.track('Purchase', {
        value: 1,
        currency: 'TWD',
        content_category: PIXEL_CONTENT_CATEGORY.UPLOAD_TIME_AND_SALARY,
      });
    },
    [dispatch],
  );
  const onSubmitError = useCallback(async error => {
    ReactGA.event({
      category: GA_CATEGORY.SHARE_TIME_SALARY,
      action: GA_ACTION.UPLOAD_FAIL,
    });
  }, []);

  return (
    <SubmittableFormBuilder
      open={open}
      questions={questions}
      header={renderCompanyJobTitleHeader}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
      redirectPathnameOnSuccess="/salary-work-times/latest"
    />
  );
};

export default TypeForm;
