import React, { Fragment } from 'react';
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
  all,
  equals,
  keys,
  path,
  range,
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
  DATA_KEY_CURRENTLY_EMPLOYED,
  DATA_KEY_SECTOR,
  DATA_KEY_EMPLOY_TYPE,
  DATA_KEY_GENDER,
  DATA_KEY_EXPERIENCE_IN_YEAR,
  DATA_KEY_DAY_PROMISED_WORK_TIME,
  DATA_KEY_DAY_REAL_WORK_TIME,
  DATA_KEY_WEEK_WORK_TIME,
  DATA_KEY_OVERTIME_FREQUENCY,
  DATA_KEY_HAS_OVERTIME_SALARY,
  DATA_KEY_HAS_COMPENSATORY_DAYOFF,
} from './constants';
import {
  isArray,
  wordCount,
  isSalaryAmount,
  greaterThan,
  greaterThanOrEqualTo,
  joinCompact,
  isNot,
  within,
  isValidSalary,
  isNumber,
} from './utils';
import { getCompaniesSearch } from 'apis/companySearchApi';
import { getJobTitlesSearch } from 'apis/jobTitleSearchApi';
import { employmentTypeOptions } from './common/optionMap';
import WorkTimeExample from './WorkTimeExample';
import Emoji from '../common/icons/Emoji';
import { tabTypeTranslation } from '../../constants/companyJobTitle';

export const createCompanyQuestion = ({ header }) => ({
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
  header,
});

export const createJobTitleQuestion = ({ header }) => ({
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
  header,
});

export const createCurrentlyEmployedQuestion = () => ({
  title: '你現在在職嗎？',
  type: 'radio-else-date',
  dataKey: DATA_KEY_CURRENTLY_EMPLOYED,
  required: true,
  defaultValue: [null, [null, null]],
  options: [{ label: '在職', value: 'yes' }, { label: '已離職', value: 'no' }],
  elseOptionValue: 'no',
  validator: ([value, [year, month]]) =>
    isNot(isNil, value) &&
    (value === 'no' ? isNot(isNil, year) && isNot(isNil, month) : true),
  warning: ([value, [year, month]]) =>
    isNil(value)
      ? '請填寫是否在職'
      : value === 'no' && (isNil(year) || isNil(month))
      ? `需填寫離職${joinCompact(' 及 ')(
          isNil(year) && '年份',
          isNil(month) && '月份',
        )}`
      : null,
});

export const createSectorQuestion = () => ({
  title: '廠區/門市/分公司',
  type: 'text',
  dataKey: DATA_KEY_SECTOR,
  defaultValue: '',
});

export const createEmployTypeQuestion = () => ({
  title: '職務型態',
  type: 'radio',
  dataKey: DATA_KEY_EMPLOY_TYPE,
  required: true,
  defaultValue: null,
  options: employmentTypeOptions,
  validator: isNot(isNil),
  warning: '請填寫職務型態',
});

export const createGenderQuestion = () => ({
  title: '性別',
  type: 'radio',
  dataKey: DATA_KEY_GENDER,
  defaultValue: null,
  options: [
    {
      label: '男',
      value: 'male',
    },
    {
      label: '女',
      value: 'female',
    },
    {
      label: '其他',
      value: 'other',
    },
  ],
});

export const createInterviewDateQuestion = () => ({
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
});

export const createInterviewRegionQuestion = () => ({
  title: '面試地區',
  type: 'radio',
  dataKey: DATA_KEY_REGION,
  defaultValue: null,
  required: true,
  validator: isNot(isNil),
  warning: '需填寫面試地區',
  options: REGION_OPTIONS,
});

export const createInterviewResultQuestion = () => ({
  title: '面試結果',
  type: 'radio-else',
  dataKey: DATA_KEY_RESULT,
  defaultValue: [null, ''],
  required: true,
  validator: ([selected, elseText]) =>
    isNot(isNil, selected) &&
    (equals(selected, last(RESULT_OPTIONS))
      ? within(1, 100, elseText.length)
      : true),
  warning: ([selected, elseText]) =>
    isEmpty(elseText)
      ? '需填寫面試結果'
      : !within(1, 100, elseText.length)
      ? '面試結果僅限 1~100 字！'
      : null,
  options: RESULT_OPTIONS,
  elseOptionValue: last(RESULT_OPTIONS),
  placeholder: '輸入面試結果',
});

export const createInterviewRatingQuestion = () => ({
  title: '為這次的面試經驗評個分吧！',
  type: 'rating',
  dataKey: DATA_KEY_RATING,
  defaultValue: 0,
  required: true,
  validator: greaterThan(0),
  warning: '需選取面試滿意程度',
  ratingLabels: RATING_LABELS,
});

export const createInterviewCourseQuestion = () => ({
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
  warning: value => `至少 ${COURSE_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
  footnote: value =>
    `至少 ${COURSE_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
});

export const createInterviewSuggestionsQuestion = () => ({
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
    `至少 ${SUGGESTIONS_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
  footnote: value =>
    `至少 ${SUGGESTIONS_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
});

export const createJobTenureQuestion = () => ({
  title: ({ jobTitle }) => `從事${jobTitle}相關的工作多久？`,
  type: 'radio',
  dataKey: DATA_KEY_JOB_TENURE,
  defaultValue: null,
  options: JOB_TENURE_OPTIONS,
});

export const createRequiredSalaryQuestion = () => ({
  title: '薪資',
  type: 'select-text',
  dataKey: DATA_KEY_SALARY,
  defaultValue: [null, ''],
  required: true,
  validator: ([type, amount]) =>
    isNot(isNil, type) &&
    isNot(isEmpty, amount) &&
    isSalaryAmount(amount) &&
    isValidSalary(SALARY_TYPE_VALUE_BY_OPTION[type], amount),
  warning: ([type, amount]) =>
    isNil(type)
      ? '需選擇薪水類型'
      : isNot(isEmpty, amount) &&
        isNot(isValidSalary(SALARY_TYPE_VALUE_BY_OPTION[type]), amount)
      ? '薪資不合理。可能有少填寫 0，或薪資種類(年薪/月薪/日薪/時薪)選擇錯誤，請再檢查一次'
      : '需填寫薪資',
  options: keys(SALARY_TYPE_VALUE_BY_OPTION),
  placeholder: '700,000',
  suffix: '元',
  footnote:
    '薪資請以包含平常的薪資、分紅、年終、績效獎金等實質上獲得的價值去計算。',
});

export const createSalaryQuestion = () => {
  const {
    required,
    validator,
    warning,
    ...question
  } = createRequiredSalaryQuestion();
  return {
    ...question,
    validator: ([type, amount]) =>
      (isNil(type) && isEmpty(amount)) || validator([type, amount]),
    warning: ([type, amount]) =>
      isNil(type) && isEmpty(amount) ? null : warning([type, amount]),
  };
};

export const createExperienceInYearQuestion = () => ({
  title: '當時業界工作經歷',
  type: 'radio',
  dataKey: DATA_KEY_EXPERIENCE_IN_YEAR,
  required: true,
  defaultValue: null,
  options: ['不到 1 年', ...range(1, 51).map(n => `${n} 年`)],
  validator: isNot(isNil),
  warning: '需填寫工作經歷',
});

export const createDayPromisedWorkTimeQuestion = () => ({
  title: '工作日表訂工時',
  type: 'text',
  dataKey: DATA_KEY_DAY_PROMISED_WORK_TIME,
  required: true,
  defaultValue: '',
  validator: isNumber,
  warning: '請填寫表定工時',
  placeholder: '8 或 8.5',
  footnote: '工作日指與雇主約定的上班日，或是排班排定的日子。',
});

export const createDayRealWorkTimeQuestion = () => ({
  title: '實際平均工時',
  type: 'text',
  dataKey: DATA_KEY_DAY_REAL_WORK_TIME,
  required: true,
  defaultValue: '',
  validator: isNumber,
  warning: '請填寫實際工時',
  placeholder: '8 或 8.5',
  footnote: (
    <Fragment>
      實際平均工時包含在家工作、待命的時間。
      <WorkTimeExample>
        例如: 公司規定 9:00上班，18:00 下班，午休 1 小時。 那麼表訂工作時間為
        (18:00-9:00)-1=8 小時。 若實際上平均 20:00 才下班，則實際工作時間為
        (20:00-9:00)-1=10 小時。
      </WorkTimeExample>
    </Fragment>
  ),
});

export const createWeekWorkTimeQuestion = () => ({
  title: '一週總工時',
  type: 'text',
  dataKey: DATA_KEY_WEEK_WORK_TIME,
  required: true,
  defaultValue: '',
  validator: isNumber,
  warning: '請填寫週總工時',
  placeholder: '40 或 40.5',
  footnote: (
    <Fragment>
      請您留下最近一週的「實際工作時數（不含休息時間，如：午休）」。
      <WorkTimeExample>
        例如: 週一至週五工作 10 小時，週六加班 8 小時，則最近一週工時為 10x5+8 =
        58 小時。
        若您為每月排班，您可以考慮將整個月個工時加總，除上該月天數，再乘上七估算。
      </WorkTimeExample>
    </Fragment>
  ),
});

const OptionEmoji = ({ value, children }) => (
  <Fragment>
    {children}
    <Emoji
      emoji={`emoji-${value}`}
      style={{ width: '25px', height: '25px', marginLeft: '4px' }}
    />
  </Fragment>
);

const OVERTIME_FREQUENCY_LABELS = ['幾乎不', '偶爾', '經常', '幾乎每天'];

export const createOvertimeFrequencyQuestion = () => ({
  title: '加班頻率',
  type: 'radio',
  dataKey: DATA_KEY_OVERTIME_FREQUENCY,
  required: true,
  defaultValue: null,
  options: OVERTIME_FREQUENCY_LABELS.map((label, index) => ({
    label: <OptionEmoji value={index}>{label}</OptionEmoji>,
    value: index,
  })),
  validator: isNot(isNil),
  warning: '需填寫加班頻率',
});

export const createOvertimeSalaryQuestion = () => ({
  title: '加班有無加班費',
  type: 'radio-else-radio',
  dataKey: DATA_KEY_HAS_OVERTIME_SALARY,
  defaultValue: [null, null],
  validator: ([selected, elseValue]) =>
    selected === 'yes' ? elseValue !== null : true,
  warning: ([selected, elseValue]) =>
    selected === 'yes' && elseValue === null
      ? '需填寫加班費是否符合勞基法'
      : null,
  options: [
    { label: '有', value: 'yes' },
    { label: '沒有', value: 'no' },
    { label: '不知道', value: "don't know" },
  ],
  elseOptionValue: 'yes',
  elseOptions: [
    { label: '有，優於或符合勞基法', value: 'yes' },
    { label: '有，不符合勞基法', value: 'no' },
    { label: '有，不清楚是否符合勞基法', value: "don't know" },
  ],
});

export const createCompensatoryDayOffQuestion = () => ({
  title: '加班有無補休',
  type: 'radio',
  dataKey: DATA_KEY_HAS_COMPENSATORY_DAYOFF,
  defaultValue: null,
  options: [
    { label: '有', value: 'yes' },
    { label: '沒有', value: 'no' },
    { label: '不知道', value: "don't know" },
  ],
});

export const createQuestionsQuestion = () => ({
  title: '面試中問了什麼問題？',
  type: 'text-list',
  dataKey: DATA_KEY_QUESTIONS,
  defaultValue: [],
  validator: all(isNot(isEmpty)),
  warning: '需填寫面試問題內容',
  placeholder: '面試問題',
});

export const createSensitiveQuestionsQuestion = () => ({
  title: '是否有以下特殊問題？',
  type: 'checkbox-else',
  dataKey: DATA_KEY_SENSITIVE_QUESTIONS,
  defaultValue: [[], ''],
  validator: ([selected, elseText]) =>
    !contains(last(SENSITIVE_QUESTIONS_OPTIONS), selected) ||
    within(1, 20, elseText.length),
  warning: ([selected, elseText]) =>
    contains(last(SENSITIVE_QUESTIONS_OPTIONS), selected) && isEmpty(elseText)
      ? '需填寫其他特殊問題的內容'
      : !within(1, 20, elseText.length)
      ? '面試中提及的特別問題僅限 1~20 字！'
      : null,
  options: SENSITIVE_QUESTIONS_OPTIONS,
  elseOptionValue: last(SENSITIVE_QUESTIONS_OPTIONS),
  placeholder: '輸入其他特殊問題內容',
});

export const createSubmitQuestion = ({ type }) => ({
  title: () => () =>
    `感謝你分享${tabTypeTranslation[type]}，按下「送出」，馬上就可以解鎖全站 2 萬多筆資料哦！`,
  type: 'customized',
  dataKey: '',
});
