import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactGA from 'react-ga4';

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
import { generateTabURL, pageType, tabType } from 'constants/companyJobTitle';

import { createSalaryWorkTime } from 'actions/timeAndSalary';
import { transferKeyToSnakecase } from 'utils/objectUtil';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';

import { sendEvent } from 'utils/hotjarUtil';
import { getUserPseudoId } from 'utils/GAUtils';

import { GA_MEASUREMENT_ID } from '../../../config';

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
  experienceInYear: draft => draft[DATA_KEY_EXPERIENCE_IN_YEAR].toString(),
  dayPromisedWorkTime: draft => draft[DATA_KEY_DAY_PROMISED_WORK_TIME],
  dayRealWorkTime: draft => draft[DATA_KEY_DAY_REAL_WORK_TIME],
  weekWorkTime: draft => draft[DATA_KEY_WEEK_WORK_TIME],
  overtimeFrequency: draft => draft[DATA_KEY_OVERTIME_FREQUENCY].toString(),
  hasOvertimeSalary: draft => draft[DATA_KEY_HAS_OVERTIME_SALARY][0],
  isOvertimeSalaryLegal: draft => draft[DATA_KEY_HAS_OVERTIME_SALARY][1],
  hasCompensatoryDayoff: draft => draft[DATA_KEY_HAS_COMPENSATORY_DAYOFF],
});

const TypeForm = ({ open, onClose, hideProgressBar = false }) => {
  useEffect(() => {
    if (open) {
      // send hotjar event for recording
      sendEvent('enter_salary_form');

      // send to GA for tracking conversion rate
      ReactGA.event({
        category: hideProgressBar
          ? GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM_HIDE_PROGRESS_BAR
          : GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM,
        action: GA_ACTION.START_WRITING,
      });
    }
  }, [hideProgressBar, open]);

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    async draft => {
      const ga_user_pseudo_id = await getUserPseudoId(GA_MEASUREMENT_ID);
      const extra = {
        form_type: hideProgressBar
          ? GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM_HIDE_PROGRESS_BAR
          : GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM,
        ga_user_pseudo_id,
      };
      const body = {
        ...transferKeyToSnakecase(bodyFromDraft(draft)),
        extra,
      };
      await dispatch(
        createSalaryWorkTime({
          body,
        }),
      );

      ReactGA.event({
        category: hideProgressBar
          ? GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM_HIDE_PROGRESS_BAR
          : GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM,
        action: GA_ACTION.UPLOAD_SUCCESS,
      });
    },
    [dispatch, hideProgressBar],
  );
  const onSubmitError = useCallback(
    async error => {
      ReactGA.event({
        category: hideProgressBar
          ? GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM_HIDE_PROGRESS_BAR
          : GA_CATEGORY.SHARE_TIME_SALARY_TYPE_FORM,
        action: GA_ACTION.UPLOAD_FAIL,
      });
    },
    [hideProgressBar],
  );

  return (
    <SubmittableFormBuilder
      open={open}
      questions={questions}
      header={renderCompanyJobTitleHeader}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
      redirectPathnameOnSuccess={draft =>
        generateTabURL({
          pageType: pageType.COMPANY,
          pageName: draft[DATA_KEY_COMPANY_NAME],
          tabType: tabType.TIME_AND_SALARY,
        })
      }
      hideProgressBar={hideProgressBar}
    />
  );
};

export default TypeForm;
