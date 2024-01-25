import React, { useCallback, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { last, contains, head, equals, reject } from 'ramda';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';

import { calcInterviewExperienceValue } from 'utils/uploadSuccessValueCalc';
import FormBuilder from 'common/FormBuilder';
import ConfirmModal from 'common/FormBuilder/Modals/ConfirmModal';
import Header, { CompanyJobTitleHeader } from '../../common/TypeFormHeader';
import Footer from '../../common/TypeFormFooter';
import { createInterviewExperience } from 'actions/experiences';
import { useExperienceCount, useSalaryWorkTimeCount } from 'hooks/useCount';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';
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
  SALARY_TYPE_VALUE_BY_OPTION,
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

import { GA_MEASUREMENT_ID } from '../../../../config';

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
  createInterviewDateQuestion({ header: renderCompanyJobTitleHeader }),
  createInterviewRegionQuestion({ header: renderCompanyJobTitleHeader }),
  createInterviewResultQuestion({ header: renderCompanyJobTitleHeader }),
  createInterviewRatingQuestion({ header: renderCompanyJobTitleHeader }),
  createInterviewCourseQuestion({ header: renderCompanyJobTitleHeader }),
  createInterviewSuggestionsQuestion({ header: renderCompanyJobTitleHeader }),
  createJobTenureQuestion({ header: renderCompanyJobTitleHeader }),
  createSalaryQuestion({ header: renderCompanyJobTitleHeader }),
  createQuestionsQuestion({ header: renderCompanyJobTitleHeader }),
  createSensitiveQuestionsQuestion({ header: renderCompanyJobTitleHeader }),
  createSubmitQuestion({ header: renderCompanyJobTitleHeader }),
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
      type: SALARY_TYPE_VALUE_BY_OPTION[type],
      amount: parseSalaryAmount(amount),
    };
  },
  overall_rating: draft => draft[DATA_KEY_RATING],
});

const TypeForm = ({ open, onClose }) => {
  const history = useHistory();
  const [submitStatus, setSubmitStatus] = useState('unsubmitted');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    async draft => {
      try {
        if (submitStatus === 'submitting') {
          return;
        }
        const body = bodyFromDraft(draft);
        const ga_user_pseudo_id = await getUserPseudoId(GA_MEASUREMENT_ID);
        body.extra = {
          form_type: GA_CATEGORY.SHARE_INTERVIEW_TYPE_FORM,
          ga_user_pseudo_id,
        };
        // section 的標題與預設文字 = 4 + 11 + 19 + 25 個字
        const goalValue = calcInterviewExperienceValue(body, 59);

        setSubmitStatus('submitting');
        const resBody = await dispatch(createInterviewExperience({ body }));
        const experienceId = resBody.createInterviewExperience.experience.id;
        ReactGA.event({
          category: GA_CATEGORY.SHARE_INTERVIEW_TYPE_FORM,
          action: GA_ACTION.UPLOAD_SUCCESS,
          value: goalValue,
          label: experienceId,
        });
        ReactPixel.track('Purchase', {
          value: 1,
          currency: 'TWD',
          content_category: PIXEL_CONTENT_CATEGORY.UPLOAD_INTERVIEW_EXPERIENCE,
        });
        setSubmitStatus('success');
      } catch (error) {
        setErrorMessage(error.message);
        ReactGA.event({
          category: GA_CATEGORY.SHARE_INTERVIEW_TYPE_FORM,
          action: GA_ACTION.UPLOAD_FAIL,
        });
        setSubmitStatus('error');
      }
    },
    [dispatch, submitStatus],
  );

  const experienceCount = useExperienceCount();
  const salaryCount = useSalaryWorkTimeCount();

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
    <Fragment>
      <FormBuilder
        open={open}
        onClose={() => setSubmitStatus('quitting')}
        questions={questions}
        header={header}
        footer={<Footer dataNum={salaryCount + experienceCount} />}
        onSubmit={handleSubmit}
      />
      <ConfirmModal
        isOpen={submitStatus === 'success'}
        title="上傳成功"
        subtitle="你已解鎖全站資訊囉！"
        description="感謝你分享你的資訊，台灣的職場因為有你而變得更好！"
        close={() => {
          setSubmitStatus('unsubmitted');
          onClose();
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
        closableOnClickOutside
        actions={[
          [
            '確定',
            () => {
              setSubmitStatus('unsubmitted');
              onClose();
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            },
          ],
        ]}
      />
      <ConfirmModal
        isOpen={submitStatus === 'error'}
        title="上傳失敗"
        description={errorMessage}
        close={() => {
          setSubmitStatus('unsubmitted');
        }}
        closableOnClickOutside
        actions={[
          [
            '確定',
            () => {
              setSubmitStatus('unsubmitted');
            },
          ],
        ]}
      />
      <ConfirmModal
        isOpen={submitStatus === 'quitting'}
        title="確定要離開？"
        description="離開之後資訊將會消失"
        close={() => {
          setSubmitStatus('unsubmitted');
        }}
        closableOnClickOutside
        actions={[
          [
            '確定離開',
            () => {
              setSubmitStatus('unsubmitted');
              onClose();
            },
          ],
          [
            '分享其他資訊',
            () => {
              setSubmitStatus('unsubmitted');
              history.push('/share');
            },
          ],
          [
            '取消',
            () => {
              setSubmitStatus('unsubmitted');
            },
          ],
        ]}
      />
    </Fragment>
  );
};

TypeForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TypeForm;
