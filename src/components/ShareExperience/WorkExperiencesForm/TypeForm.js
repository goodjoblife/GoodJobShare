import PropTypes from 'prop-types';
import { head } from 'ramda';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useDispatch } from 'react-redux';

import { createWorkExperienceWithRating } from 'actions/experiences';
import { TabType, tabTypeTranslation } from 'constants/companyJobTitle';
import { ER0020, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import { GA_ACTION, GA_CATEGORY } from 'constants/gaConstants';
import { sendEvent } from 'utils/hotjarUtil';
import rollbar from 'utils/rollbar';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_CURRENTLY_EMPLOYED,
  DATA_KEY_EXPERIENCE_IN_YEAR,
  DATA_KEY_GENDER,
  DATA_KEY_JOB_LEVEL,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_REGION,
  DATA_KEY_SALARY,
  DATA_KEY_SECTIONS,
  DATA_KEY_SECTOR,
  DATA_KEY_WEEK_WORK_TIME,
  JOB_TENURE_OPTIONS,
} from '../constants';
import PolicySimpleTypeForm from '../PolicyForm/SimpleTypeForm';
import {
  createCompanyQuestion,
  createCurrentlyEmployedQuestion,
  createEmployTypeQuestion,
  createExperienceInYearQuestion,
  createGenderQuestion,
  createJobLevel,
  createJobTitleQuestion,
  createRequiredSalaryQuestion,
  createSectionsQuestion,
  createSectorQuestion,
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
  createSectorQuestion(),
  createEmployTypeQuestion(),
  createGenderQuestion(),
  createRequiredSalaryQuestion({ type: TabType.WORK_EXPERIENCE }),
  createJobLevel(),
  createWeekWorkTimeQuestion(),
  createSectionsQuestion(),
  createSubmitQuestion({ label: tabTypeTranslation[TabType.WORK_EXPERIENCE] }),
];

const bodyFromDraft = evolve({
  company: draft => ({ id: '', query: draft[DATA_KEY_COMPANY_NAME] }),
  region: draft => draft[DATA_KEY_REGION],
  job_title: draft => draft[DATA_KEY_JOB_TITLE],
  sector: draft => draft[DATA_KEY_SECTOR],
  gender: draft => draft[DATA_KEY_GENDER],
  jobLevel: draft => draft[DATA_KEY_JOB_LEVEL],
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

const experiencePathnameOf = experienceId => `/experiences/${experienceId}`;

const redirectToExperience = ({ experience: { id } }) =>
  experiencePathnameOf(id);

const toPolicyDraft = ({ experience: { id } }, workExperienceDraft) => ({
  experienceId: id,
  companyName: workExperienceDraft[DATA_KEY_COMPANY_NAME],
  jobTitle: workExperienceDraft[DATA_KEY_JOB_TITLE],
  sector: workExperienceDraft[DATA_KEY_SECTOR],
});

const WorkExperiencesTypeForm = ({
  open,
  onClose,
  hideProgressBar,
  successDescription,
  onSuccessContinue,
}) => {
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
        ...bodyFromDraft(draft),
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
      redirectLocationOnSuccess={redirectToExperience}
      successDescription={successDescription}
      onSuccessContinue={onSuccessContinue}
    />
  );
};

WorkExperiencesTypeForm.propTypes = {
  hideProgressBar: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSuccessContinue: PropTypes.func,
  open: PropTypes.bool.isRequired,
  successDescription: PropTypes.string,
};

const TypeForm = ({ open, onClose, hideProgressBar = false }) => {
  const [policyDraft, setPolicyDraft] = useState(null);
  const onContinueToPolicyForm = useCallback(
    (result, workExperienceDraft) =>
      setPolicyDraft(toPolicyDraft(result, workExperienceDraft)),
    [],
  );
  const closePolicyForm = useCallback(() => setPolicyDraft(null), []);
  const policyFormQuitPathname = useCallback(
    () => experiencePathnameOf(policyDraft.experienceId),
    [policyDraft],
  );

  return (
    <Fragment>
      <WorkExperiencesTypeForm
        open={open}
        onClose={onClose}
        hideProgressBar={hideProgressBar}
        successDescription="再回答幾個問題，加碼解鎖 14 天。"
        onSuccessContinue={onContinueToPolicyForm}
      />
      <PolicySimpleTypeForm
        open={policyDraft !== null}
        onClose={closePolicyForm}
        companyName={policyDraft?.companyName || ''}
        jobTitle={policyDraft?.jobTitle || ''}
        sector={policyDraft?.sector || ''}
        redirectLocationOnQuit={policyFormQuitPathname}
      />
    </Fragment>
  );
};

TypeForm.propTypes = {
  hideProgressBar: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default TypeForm;
