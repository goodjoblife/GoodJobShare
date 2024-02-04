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
  any,
  equals,
  keys,
  path,
} from 'ramda';
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
  lessThan,
  joinCompact,
  isNot,
  within,
  isValidSalary,
} from './utils';
import { getCompaniesSearch } from 'apis/companySearchApi';
import { getJobTitlesSearch } from 'apis/jobTitleSearchApi';
import { QUESTION_TYPE } from '../common/FormBuilder/QuestionBuilder';

export const createCompanyQuestion = ({ header }) => ({
  title: '公司名稱',
  type: QUESTION_TYPE.TEXT,
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
  validateOrWarn: value => isEmpty(value) && '請填寫公司名稱',
  placeholder: 'ＯＯ 股份有限公司',
  search: value =>
    getCompaniesSearch({ key: value }).then(
      ifElse(isArray, map(prop('name')), always([])),
    ),
  header,
});

export const createJobTitleQuestion = ({ header }) => ({
  title: '應徵職稱',
  type: QUESTION_TYPE.TEXT,
  dataKey: DATA_KEY_JOB_TITLE,
  defaultValue: '',
  required: true,
  validateOrWarn: value => isEmpty(value) && '請填寫職稱',
  placeholder: '軟體工程師',
  search: value =>
    getJobTitlesSearch({ key: value }).then(when(isNot(isArray), always([]))),
  header,
});

export const createInterviewDateQuestion = () => ({
  title: '什麼時候去面試的呢？',
  type: QUESTION_TYPE.DATE,
  dataKey: DATA_KEY_DATE,
  defaultValue: [null, null],
  required: true,
  validateOrWarn: ([year, month]) =>
    (isNil(year) || isNil(month)) &&
    `需填寫面試${joinCompact(' 及 ')(
      isNil(year) && '年份',
      isNil(month) && '月份',
    )}`,
});

export const createInterviewRegionQuestion = () => ({
  title: '面試地區',
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_REGION,
  defaultValue: null,
  required: true,
  validateOrWarn: value => isNil(value) && '需填寫面試地區',
  options: REGION_OPTIONS,
});

export const createInterviewResultQuestion = () => ({
  title: '面試結果',
  type: QUESTION_TYPE.RADIO_ELSE,
  dataKey: DATA_KEY_RESULT,
  defaultValue: [null, ''],
  required: true,
  validateOrWarn: ([selected, elseText]) => {
    if (isNil(selected)) return '需填寫面試結果';
    if (equals(selected, last(RESULT_OPTIONS))) {
      if (isEmpty(elseText)) return '需填寫面試結果';
      if (!within(1, 100, elseText.length)) return '面試結果僅限 1~100 字！';
    }
    return null;
  },
  options: RESULT_OPTIONS,
  placeholder: '輸入面試結果',
});

export const createInterviewRatingQuestion = () => ({
  title: '為這次的面試經驗評個分吧！',
  type: QUESTION_TYPE.RATING,
  dataKey: DATA_KEY_RATING,
  defaultValue: 0,
  required: true,
  validateOrWarn: value => equals(0, value) && '需選取面試滿意程度',
  ratingLabels: RATING_LABELS,
});

export const createInterviewCourseQuestion = () => ({
  title: '面試過程',
  type: QUESTION_TYPE.TEXTAREA,
  dataKey: DATA_KEY_COURSE,
  defaultValue: `第一次面試：
第二次面試：
工作環境：`,
  required: true,
  validateOrWarn: value =>
    compose(
      lessThan(COURSE_MIN_LENGTH),
      wordCount,
    )(value) && `至少 ${COURSE_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
  footnote: value =>
    `至少 ${COURSE_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
});

export const createInterviewSuggestionsQuestion = () => ({
  title: '給其他面試者的中肯建議',
  type: QUESTION_TYPE.TEXTAREA,
  dataKey: DATA_KEY_SUGGESTIONS,
  defaultValue: `如何準備面試：
是否推薦此份工作：
其他注意事項：`,
  required: true,
  validateOrWarn: value =>
    compose(
      lessThan(SUGGESTIONS_MIN_LENGTH),
      wordCount,
    )(value) &&
    `至少 ${SUGGESTIONS_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
  footnote: value =>
    `至少 ${SUGGESTIONS_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
});

export const createJobTenureQuestion = () => ({
  title: ({ jobTitle }) => `從事${jobTitle}相關的工作多久？`,
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_JOB_TENURE,
  defaultValue: null,
  options: JOB_TENURE_OPTIONS,
});

export const createSalaryQuestion = () => ({
  title: '面談薪資',
  type: QUESTION_TYPE.SELECT_TEXT,
  dataKey: DATA_KEY_SALARY,
  defaultValue: [null, ''],
  validateOrWarn: ([type, amount]) =>
    isNot(isNil, type) && (isEmpty(amount) || isNot(isSalaryAmount, amount))
      ? '需填寫薪資'
      : isNil(type) && isNot(isEmpty, amount)
      ? '需選擇薪水類型'
      : isNot(isNil, type) &&
        isNot(isValidSalary(SALARY_TYPE_VALUE_BY_OPTION[type]), amount)
      ? '薪資不合理。可能有少填寫 0，或薪資種類(年薪/月薪/日薪/時薪)選擇錯誤，請再檢查一次'
      : null,
  options: keys(SALARY_TYPE_VALUE_BY_OPTION),
  placeholder: '700,000',
});

export const createQuestionsQuestion = () => ({
  title: '面試中問了什麼問題？',
  type: QUESTION_TYPE.TEXT_LIST,
  dataKey: DATA_KEY_QUESTIONS,
  defaultValue: [],
  validateOrWarn: value => any(isEmpty, value) && '需填寫面試問題內容',
  placeholder: '面試問題',
});

export const createSensitiveQuestionsQuestion = () => ({
  title: '是否有以下特殊問題？',
  type: QUESTION_TYPE.CHECKBOX_ELSE,
  dataKey: DATA_KEY_SENSITIVE_QUESTIONS,
  defaultValue: [[], ''],
  validateOrWarn: ([selected, elseText]) =>
    contains(last(SENSITIVE_QUESTIONS_OPTIONS), selected) &&
    (isEmpty(elseText)
      ? '需填寫其他特殊問題的內容'
      : !within(1, 20, elseText.length)
      ? '面試中提及的特別問題僅限 1~20 字！'
      : null),
  options: SENSITIVE_QUESTIONS_OPTIONS,
  placeholder: '輸入其他特殊問題內容',
});

export const createSubmitQuestion = () => ({
  title: () => () =>
    '感謝你分享面試心得，按下「送出」，馬上就可以解鎖全站 2 萬多筆資料哦！',
  type: QUESTION_TYPE.CUSTOMIZED,
  dataKey: '',
});
