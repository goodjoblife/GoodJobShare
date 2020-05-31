import React, { useCallback, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  isNil,
  isEmpty,
  ifElse,
  map,
  prop,
  always,
  when,
  last,
  compose,
  contains,
  head,
  all,
  equals,
  keys,
  reject,
  path,
} from 'ramda';
import { useDispatch } from 'react-redux';

import FormBuilder from 'common/FormBuilder';
import ConfirmModal from 'common/FormBuilder/Modals/ConfirmModal';
import Header, { CompanyJobTitleHeader } from '../../common/TypeFormHeader';
import Footer from '../../common/TypeFormFooter';
import { getCompaniesSearch } from '../../../../apis/companySearchApi';
import { getJobTitlesSearch } from '../../../../apis/jobTitleSearchApi';
import { createInterviewExperience } from '../../../../actions/experiences';
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
  REGION_OPTIONS,
  RESULT_OPTIONS,
  RATING_LABELS,
  JOB_TENURE_OPTIONS,
  SALARY_TYPE_VALUE_BY_OPTION,
  SENSITIVE_QUESTIONS_OPTIONS,
  COURSE_MIN_LENGTH,
  SUGGESTIONS_MIN_LENGTH,
} from './constants';
import {
  isArray,
  wordCount,
  isSalaryAmount,
  parseSalaryAmount,
  greaterThan,
  greaterThanOrEqualTo,
  joinCompact,
  evolve,
  isNot,
} from './utils';
import { useHistory } from 'react-router';

const header = <Header title="請輸入你的一份面試經驗" />;
const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="面試"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);
const footer = <Footer />;

const questions = [
  {
    title: '公司名稱',
    type: 'text',
    dataKey: DATA_KEY_COMPANY_NAME,
    defaultValue: () => {
      const state =
        typeof window === 'undefined'
          ? {}
          : path(['history', 'state', 'state'], window) || {};
      const companyName = state.companyName || '';
      return companyName;
    },
    required: true,
    validator: isNot(isEmpty),
    warning: '請填寫公司名稱',
    placeholder: 'ＯＯ 股份有限公司',
    search: value =>
      getCompaniesSearch({ key: value }).then(
        ifElse(isArray, map(prop('name')), always([])),
      ),
  },
  {
    title: '應徵職稱',
    type: 'text',
    dataKey: DATA_KEY_JOB_TITLE,
    defaultValue: '',
    required: true,
    validator: isNot(isEmpty),
    warning: '請填寫職稱',
    placeholder: '軟體工程師',
    search: value =>
      getJobTitlesSearch({ key: value }).then(when(isNot(isArray), always([]))),
  },
  {
    title: '什麼時候去面試的呢？',
    type: 'date',
    dataKey: DATA_KEY_DATE,
    defaultValue: [null, null],
    required: true,
    validator: ([year, month]) => isNot(isNil, year) && isNot(isNil, month),
    warning: ([year, month]) =>
      `需填寫面試${joinCompact(' 及 ')(
        isNil(year) && '年份',
        isNil(month) && '月份',
      )}`,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試地區',
    type: 'radio',
    dataKey: DATA_KEY_REGION,
    defaultValue: null,
    required: true,
    validator: isNot(isNil),
    warning: '需填寫面試地區',
    options: REGION_OPTIONS,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試結果',
    type: 'radio-else',
    dataKey: DATA_KEY_RESULT,
    defaultValue: [null, ''],
    required: true,
    validator: ([selected, elseText]) =>
      isNot(isNil, selected) &&
      (equals(selected, last(RESULT_OPTIONS))
        ? isNot(isEmpty, elseText)
        : true),
    warning: '需填寫面試結果',
    options: RESULT_OPTIONS,
    placeholder: '輸入面試結果',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '為這次的面試經驗評個分吧！',
    type: 'rating',
    dataKey: DATA_KEY_RATING,
    defaultValue: 0,
    required: true,
    validator: greaterThan(0),
    warning: '需選取面試滿意程度',
    ratingLabels: RATING_LABELS,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試過程',
    type: 'textarea',
    dataKey: DATA_KEY_COURSE,
    defaultValue: `第一次面試：
第二次面試：
工作環境：`,
    required: true,
    validator: compose(
      greaterThanOrEqualTo(COURSE_MIN_LENGTH),
      wordCount,
    ),
    warning: value =>
      `最少 ${COURSE_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
    footnote: value =>
      `最少 ${COURSE_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '給其他面試者的中肯建議',
    type: 'textarea',
    dataKey: DATA_KEY_SUGGESTIONS,
    defaultValue: `如何準備面試：
是否推薦此份工作：
其他注意事項：`,
    required: true,
    validator: compose(
      greaterThanOrEqualTo(SUGGESTIONS_MIN_LENGTH),
      wordCount,
    ),
    warning: value =>
      `最少 ${SUGGESTIONS_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
    footnote: value =>
      `最少 ${SUGGESTIONS_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: ({ jobTitle }) => `從事${jobTitle}相關的工作多久？`,
    type: 'radio',
    dataKey: DATA_KEY_JOB_TENURE,
    defaultValue: null,
    options: JOB_TENURE_OPTIONS,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面談薪資',
    type: 'select-text',
    dataKey: DATA_KEY_SALARY,
    defaultValue: [null, ''],
    validator: ([type, amount]) =>
      isNot(isNil, type)
        ? isNot(isEmpty, amount) && isSalaryAmount(amount)
        : isEmpty(amount),
    warning: ([type, amount]) =>
      isNot(isNil, type) && (isEmpty(amount) || isNot(isSalaryAmount(amount)))
        ? '需填寫薪資'
        : isNil(type) && isNot(isEmpty, amount)
        ? '需選擇薪水類型'
        : null,
    options: keys(SALARY_TYPE_VALUE_BY_OPTION),
    placeholder: '700,000',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試中問了什麼問題？',
    type: 'text-list',
    dataKey: DATA_KEY_QUESTIONS,
    defaultValue: [],
    validator: all(isNot(isEmpty)),
    warning: '需填寫面試問題內容',
    placeholder: '面試問題',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '是否有以下特殊問題？',
    type: 'checkbox-else',
    dataKey: DATA_KEY_SENSITIVE_QUESTIONS,
    defaultValue: [[], ''],
    validator: ([selected, elseText]) =>
      !contains('其他', selected) || isNot(isEmpty, elseText),
    warning: ([selected, elseText]) =>
      contains(last(SENSITIVE_QUESTIONS_OPTIONS), selected) && isEmpty(elseText)
        ? '需填寫其他特殊問題的內容'
        : null,
    options: SENSITIVE_QUESTIONS_OPTIONS,
    placeholder: '輸入其他特殊問題內容',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: () => () =>
      '感謝你分享面試心得，按下「送出」，馬上就可以解鎖全站 2 萬多筆資料哦！',
    type: 'customized',
    dataKey: '',
    header: renderCompanyJobTitleHeader,
  },
];

const bodyFromDraft = evolve({
  company: draft => ({ id: '', query: draft[DATA_KEY_COMPANY_NAME] }),
  region: draft => draft[DATA_KEY_REGION],
  job_title: draft => draft[DATA_KEY_JOB_TITLE],
  title: '面試經驗分享',
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
        setSubmitStatus('submitting');
        await dispatch(
          createInterviewExperience({
            body: bodyFromDraft(draft),
          }),
        );
        setSubmitStatus('success');
      } catch (error) {
        setErrorMessage(error.message);
        setSubmitStatus('error');
      }
    },
    [dispatch],
  );
  return (
    <Fragment>
      <FormBuilder
        open={open}
        onClose={() => setSubmitStatus('quitting')}
        questions={questions}
        header={header}
        footer={footer}
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
