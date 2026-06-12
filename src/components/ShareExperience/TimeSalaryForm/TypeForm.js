import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useDispatch } from 'react-redux';

import { createSalaryWorkTime } from 'actions/salaryWorkTime';
import {
  generateTabURL,
  PageType,
  TabType,
  tabTypeTranslation,
} from 'constants/companyJobTitle';
import { ER0007, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import { GA_ACTION, GA_CATEGORY } from 'constants/gaConstants';
import { getUserPseudoId } from 'utils/GAUtils';
import { sendEvent } from 'utils/hotjarUtil';
import { transferKeyToSnakecase } from 'utils/objectUtil';
import rollbar from 'utils/rollbar';

import { GA_MEASUREMENT_ID } from '../../../config';
import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_CURRENTLY_EMPLOYED,
  DATA_KEY_DAY_PROMISED_WORK_TIME,
  DATA_KEY_DAY_REAL_WORK_TIME,
  DATA_KEY_EMPLOY_TYPE,
  DATA_KEY_EXPERIENCE_IN_YEAR,
  DATA_KEY_GENDER,
  DATA_KEY_HAS_COMPENSATORY_DAYOFF,
  DATA_KEY_HAS_OVERTIME_SALARY,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_OVERTIME_FREQUENCY,
  DATA_KEY_SALARY,
  DATA_KEY_SECTOR,
  DATA_KEY_WEEK_WORK_TIME,
} from '../constants';
import {
  createCompanyQuestion,
  createCompensatoryDayOffQuestion,
  createCurrentlyEmployedQuestion,
  createDayPromisedWorkTimeQuestion,
  createDayRealWorkTimeQuestion,
  createEmployTypeQuestion,
  createExperienceInYearQuestion,
  createGenderQuestion,
  createJobTitleQuestion,
  createOvertimeFrequencyQuestion,
  createOvertimeSalaryQuestion,
  createRequiredSalaryQuestion,
  createSectorQuestion,
  createSubmitQuestion,
  createWeekWorkTimeQuestion,
} from '../questionCreators';
import { evolve, parseSalaryAmount } from '../utils';

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
  createRequiredSalaryQuestion({ type: TabType.TIME_AND_SALARY }),
  createExperienceInYearQuestion(),
  createDayPromisedWorkTimeQuestion(),
  createDayRealWorkTimeQuestion(),
  createWeekWorkTimeQuestion(),
  createOvertimeFrequencyQuestion(),
  createOvertimeSalaryQuestion(),
  createCompensatoryDayOffQuestion(),
  createSubmitQuestion({ label: tabTypeTranslation[TabType.TIME_AND_SALARY] }),
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
  salaryAmount: draft =>
    parseSalaryAmount(draft[DATA_KEY_SALARY][1]).toString(),
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
      const res = await dispatch(
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

      // send hotjar event for recording
      if (body && body.gender && body.gender === 'female') {
        sendEvent('female_user_submitted_salary_form');
      }

      return res;
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
      const errorCode = ER0007;
      rollbar.error(
        `[${errorCode}] ${ERROR_CODE_MSG[errorCode].internal} ${error.message}`,
        error,
      );
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
      redirectPathnameOnSuccess={(_, draft) =>
        generateTabURL({
          pageType: PageType.COMPANY,
          pageName: draft[DATA_KEY_COMPANY_NAME],
          tabType: TabType.TIME_AND_SALARY,
        })
      }
      hideProgressBar={hideProgressBar}
    />
  );
};

TypeForm.propTypes = {
  hideProgressBar: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default TypeForm;
