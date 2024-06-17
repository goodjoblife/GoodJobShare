import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { last, contains, head, equals, reject } from 'ramda';
import { useDispatch } from 'react-redux';
import ReactGA from 'react-ga4';

import { calcInterviewExperienceValue } from 'utils/uploadSuccessValueCalc';
import Header, { CompanyJobTitleHeader } from '../../common/TypeFormHeader';
import SubmittableFormBuilder from '../../common/SubmittableFormBuilder';
import { createInterviewExperience } from 'actions/experiences';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import { ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_DATE,
  DATA_KEY_REGION,
  DATA_KEY_RESULT,
  DATA_KEY_RATING,
  DATA_KEY_COURSE,
  DATA_KEY_SUGGESTIONS,
  DATA_KEY_JOB_TENURE,
  DATA_KEY_SALARY,
  DATA_KEY_QUESTIONS,
  DATA_KEY_SENSITIVE_QUESTIONS,
  RESULT_OPTIONS,
  JOB_TENURE_OPTIONS,
  SENSITIVE_QUESTIONS_OPTIONS,
} from '../../constants';
import { parseSalaryAmount, evolve } from '../../utils';
import {
  createCompanyQuestion,
  createJobTitleQuestion,
  createInterviewDateQuestion,
  createInterviewRegionQuestion,
  createInterviewResultQuestion,
  createInterviewRatingQuestion,
  createInterviewCourseQuestion,
  createInterviewSuggestionsQuestion,
  createJobTenureQuestion,
  createSalaryQuestion,
  createQuestionsQuestion,
  createSensitiveQuestionsQuestion,
  createSubmitQuestion,
} from '../../questionCreators';
import { sendEvent } from 'utils/hotjarUtil';
import { getUserPseudoId } from 'utils/GAUtils';
import rollbar from 'utils/rollbar';

import { GA_MEASUREMENT_ID } from '../../../../config';
import { tabType } from '../../../../constants/companyJobTitle';

const header = <Header title="請輸入你的一份面試經驗" />;
const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="面試"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);

const questions = [
  createCompanyQuestion({ header }),
  createJobTitleQuestion({ header }),
  createInterviewDateQuestion(),
  createInterviewRegionQuestion(),
  createInterviewResultQuestion(),
  createInterviewRatingQuestion(),
  createInterviewCourseQuestion(),
  createInterviewSuggestionsQuestion(),
  createJobTenureQuestion(),
  createSalaryQuestion(),
  createQuestionsQuestion(),
  createSensitiveQuestionsQuestion(),
  createSubmitQuestion({ type: tabType.INTERVIEW_EXPERIENCE }),
];

const bodyFromDraft = evolve({
  company: draft => ({ id: '', query: draft[DATA_KEY_COMPANY_NAME] }),
  region: draft => draft[DATA_KEY_REGION],
  job_title: draft => draft[DATA_KEY_JOB_TITLE],
  title: draft =>
    `${draft[DATA_KEY_COMPANY_NAME]} ${draft[DATA_KEY_JOB_TITLE]} 面試經驗分享`,
  sections: draft => [
    {
      subtitle: '面試過程',
      content: draft[DATA_KEY_COURSE],
    },
    {
      subtitle: '給其他面試者的中肯建議',
      content: draft[DATA_KEY_SUGGESTIONS],
    },
  ],
  experience_in_year: draft => {
    const value = draft[DATA_KEY_JOB_TENURE];
    return value === head(JOB_TENURE_OPTIONS) ? 0 : parseInt(value, 10);
  },
  education: '',
  email: '',
  interview_time: draft => {
    const [year, month] = draft[DATA_KEY_DATE];
    return {
      year,
      month,
    };
  },
  interview_result: draft => {
    const [selected, elseText] = draft[DATA_KEY_RESULT];
    return selected === last(RESULT_OPTIONS) ? elseText : selected;
  },
  interview_qas: draft =>
    draft[DATA_KEY_QUESTIONS].map(question => ({
      question,
      answer: '',
    })),
  interview_sensitive_questions: draft => {
    const [selected, elseText] = draft[DATA_KEY_SENSITIVE_QUESTIONS];
    const lastOption = last(SENSITIVE_QUESTIONS_OPTIONS);
    const selectedWithoutLast = reject(equals(lastOption), selected);
    const hasSelectedLast = contains(lastOption, selected);
    return [...selectedWithoutLast, ...(hasSelectedLast ? [elseText] : [])];
  },
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
  overall_rating: draft => draft[DATA_KEY_RATING],
});

const TypeForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    async draft => {
      const body = bodyFromDraft(draft);
      const ga_user_pseudo_id = await getUserPseudoId(GA_MEASUREMENT_ID);
      body.extra = {
        form_type: GA_CATEGORY.SHARE_INTERVIEW_TYPE_FORM,
        ga_user_pseudo_id,
      };
      // section 的標題與預設文字 = 4 + 11 + 19 + 25 個字
      const goalValue = calcInterviewExperienceValue(body, 59);

      const resBody = await dispatch(createInterviewExperience({ body }));
      const experienceId = resBody.createInterviewExperience.experience.id;
      ReactGA.event({
        category: GA_CATEGORY.SHARE_INTERVIEW_TYPE_FORM,
        action: GA_ACTION.UPLOAD_SUCCESS,
        value: goalValue,
        label: experienceId,
      });
    },
    [dispatch],
  );

  const onSubmitError = useCallback(async error => {
    ReactGA.event({
      category: GA_CATEGORY.SHARE_INTERVIEW_TYPE_FORM,
      action: GA_ACTION.UPLOAD_FAIL,
    });
    const errorCode = 'ER0008';
    rollbar.error(
      `[${errorCode}] ${ERROR_CODE_MSG[errorCode].internal} ${error.message}`,
      error,
    );
  }, []);

  useEffect(() => {
    if (open) {
      // send hotjar event for recording
      sendEvent('enter_interview_form');

      // send to GA for tracking conversion rate
      ReactGA.event({
        category: GA_CATEGORY.SHARE_INTERVIEW_TYPE_FORM,
        action: GA_ACTION.START_WRITING,
      });
    }
  }, [open]);

  return (
    <SubmittableFormBuilder
      open={open}
      questions={questions}
      header={renderCompanyJobTitleHeader}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
    />
  );
};

TypeForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default TypeForm;
