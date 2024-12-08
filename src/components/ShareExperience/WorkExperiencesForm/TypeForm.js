import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { head } from 'ramda';
import ReactGA from 'react-ga4';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';

import {
  createCompanyQuestion,
  createJobTitleQuestion,
  createCurrentlyEmployedQuestion,
  createExperienceInYearQuestion,
  createWorkRegionQuestion,
  createEmployTypeQuestion,
  createRequiredSalaryQuestion,
  createWeekWorkTimeQuestion,
  createSubmitQuestion,
  createSectionsQuestion,
} from '../questionCreators';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_CURRENTLY_EMPLOYED,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_SALARY,
  DATA_KEY_EXPERIENCE_IN_YEAR,
  DATA_KEY_WEEK_WORK_TIME,
  DATA_KEY_REGION,
  JOB_TENURE_OPTIONS,
  DATA_KEY_SECTIONS,
} from '../constants';

import { parseSalaryAmount, evolve } from '../utils';
import { tabType } from '../../../constants/companyJobTitle';

import { createWorkExperienceWithRating } from 'actions/experiences';
import { transferKeyToSnakecase } from 'utils/objectUtil';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import { ER0020, ERROR_CODE_MSG } from 'constants/errorCodeMsg';

import { sendEvent } from 'utils/hotjarUtil';
import rollbar from 'utils/rollbar';

const header = <Header title="分享你的工作心得(評價)" />;

const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="評價"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);

const questions = [
  createCompanyQuestion({ header }),
  createJobTitleQuestion({ header }),
  createCurrentlyEmployedQuestion(),
  createExperienceInYearQuestion(),
  createWorkRegionQuestion(),
  createEmployTypeQuestion(),
  createRequiredSalaryQuestion({ type: tabType.WORK_EXPERIENCE }),
  createWeekWorkTimeQuestion(),
  createSectionsQuestion(),
  createSubmitQuestion({ type: tabType.WORK_EXPERIENCE }),
];

const bodyFromDraft = evolve({
  company: draft => ({ id: '', query: draft[DATA_KEY_COMPANY_NAME] }),
  region: draft => draft[DATA_KEY_REGION],
  job_title: draft => draft[DATA_KEY_JOB_TITLE],
  title: draft =>
    `${draft[DATA_KEY_COMPANY_NAME]} ${draft[DATA_KEY_JOB_TITLE]}`,
  sections: draft =>
    draft[DATA_KEY_SECTIONS].map(([subtitle, rating, content]) => ({
      subtitle,
      content,
      rating,
    })),
  experience_in_year: draft => {
    const value = draft[DATA_KEY_EXPERIENCE_IN_YEAR];
    return value === head(JOB_TENURE_OPTIONS) ? 0 : parseInt(value, 10);
  },
  is_currently_employed: draft => draft[DATA_KEY_CURRENTLY_EMPLOYED][0],
  job_ending_time: draft =>
    draft[DATA_KEY_CURRENTLY_EMPLOYED][0] === 'no'
      ? {
          year: draft[DATA_KEY_CURRENTLY_EMPLOYED][1][0],
          month: draft[DATA_KEY_CURRENTLY_EMPLOYED][1][1],
        }
      : null,
  salary: draft => {
    const [type, amount] = draft[DATA_KEY_SALARY];
    if (!type && !amount) {
      return undefined;
    }
    return {
      type,
      amount: parseSalaryAmount(amount),
    };
  },
  week_work_time: draft => parseInt(draft[DATA_KEY_WEEK_WORK_TIME], 10),
});

const TypeForm = ({ open, onClose, hideProgressBar = false }) => {
  useEffect(() => {
    if (open) {
      sendEvent('enter_work_form');

      // send to GA for tracking conversion rate
      ReactGA.event({
        category: GA_CATEGORY.SHARE_WORK,
        action: GA_ACTION.START_WRITING,
      });
    }
  }, [open]);

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    async draft => {
      const body = {
        ...transferKeyToSnakecase(bodyFromDraft(draft)),
      };
      const res = await dispatch(
        createWorkExperienceWithRating({
          body,
        }),
      );
      ReactGA.event({
        category: GA_CATEGORY.SHARE_WORK,
        action: GA_ACTION.UPLOAD_SUCCESS,
      });
      return res;
    },
    [dispatch],
  );
  const onSubmitError = useCallback(async error => {
    ReactGA.event({
      category: GA_CATEGORY.SHARE_WORK,
      action: GA_ACTION.UPLOAD_FAIL,
    });
    const errorCode = ER0020;
    rollbar.error(
      `[${errorCode}] ${ERROR_CODE_MSG[errorCode].internal} ${error.message}`,
      error,
    );
  }, []);

  return (
    <SubmittableFormBuilder
      open={open}
      questions={questions}
      header={renderCompanyJobTitleHeader}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
      hideProgressBar={hideProgressBar}
      redirectPathnameOnSuccess={({ experience: { id } }) =>
        `/experiences/${id}`
      }
    />
  );
};

TypeForm.propTypes = {
  hideProgressBar: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default TypeForm;
