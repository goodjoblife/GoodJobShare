import PropTypes from 'prop-types';
import { head } from 'ramda';
import React, { useCallback, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useDispatch } from 'react-redux';

import { createWorkExperienceWithRating } from 'actions/experiences';
import { TabType } from 'constants/companyJobTitle';
import { ER0020, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import { GA_ACTION, GA_CATEGORY } from 'constants/gaConstants';
import { sendEvent } from 'utils/hotjarUtil';
import { transferKeyToSnakecase } from 'utils/objectUtil';
import rollbar from 'utils/rollbar';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_CURRENTLY_EMPLOYED,
  DATA_KEY_EXPERIENCE_IN_YEAR,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_REGION,
  DATA_KEY_SALARY,
  DATA_KEY_SECTIONS,
  DATA_KEY_WEEK_WORK_TIME,
  JOB_TENURE_OPTIONS,
} from '../constants';
import {
  createCompanyQuestion,
  createCurrentlyEmployedQuestion,
  createEmployTypeQuestion,
  createExperienceInYearQuestion,
  createJobTitleQuestion,
  createRequiredSalaryQuestion,
  createSectionsQuestion,
  createSubmitQuestion,
  createWeekWorkTimeQuestion,
  createWorkRegionQuestion,
} from '../questionCreators';
import { evolve, parseSalaryAmount } from '../utils';

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
  createRequiredSalaryQuestion({ type: TabType.WORK_EXPERIENCE }),
  createWeekWorkTimeQuestion(),
  createSectionsQuestion(),
  createSubmitQuestion({ type: TabType.WORK_EXPERIENCE }),
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

      if (
        body &&
        body.sections &&
        body.sections.find(e => e.subtitle === '性別友善度')
      ) {
        sendEvent('user_submitted_work_form_with_gender_friendly_rating');
      }
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
