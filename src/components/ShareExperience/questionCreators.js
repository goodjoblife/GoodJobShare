import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  isNil,
  isEmpty,
  map,
  always,
  when,
  last,
  contains,
  equals,
  path,
  range,
} from 'ramda';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_DATE,
  DATA_KEY_REGION,
  DATA_KEY_RESULT,
  DATA_KEY_JOB_TENURE,
  DATA_KEY_SALARY,
  DATA_KEY_SENSITIVE_QUESTIONS,
  REGION_OPTIONS,
  RESULT_OPTIONS,
  RATING_LABELS,
  RATING_COURSE_LABELS,
  JOB_TENURE_OPTIONS,
  SENSITIVE_QUESTIONS_OPTIONS,
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
  DATA_KEY_SECTIONS,
  SECTION_MIN_LENGTH,
  UNRATABLE_SUBJECTS,
} from './constants';
import {
  isArray,
  wordCount,
  isSalaryAmount,
  joinCompact,
  isNot,
  within,
  isValidSalary,
  isNumber,
} from './utils';
import { fetchSearchCompany } from 'apis/timeAndSalaryApi';
import { getJobTitlesSearch } from 'apis/jobTitleSearchApi';
import { employmentTypeOptions, salaryTypeOptions } from './common/optionMap';
import WorkTimeExample from './WorkTimeExample';
import Emoji from '../common/icons/Emoji';
import {
  pageType as PAGE_TYPE,
  tabTypeTranslation,
  tabType,
} from '../../constants/companyJobTitle';
import { QUESTION_TYPE } from '../common/FormBuilder/QuestionBuilder';
import { salaryHint } from 'utils/formUtils';
import { useTotalCount } from 'hooks/useCount';
import AutoCompleteItem from './AutoCompleteItem';

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
    fetchSearchCompany({ companyName: value, hasData: false, limit: 10 }).then(
      map(({ name, businessNumber }) => ({
        label: (
          <AutoCompleteItem
            pageType={PAGE_TYPE.COMPANY}
            name={name}
            businessNumber={businessNumber}
          />
        ),
        value: name,
      })),
    ),
  header,
});

export const createJobTitleQuestion = ({ header }) => ({
  title: '職稱',
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

export const createCurrentlyEmployedQuestion = () => ({
  title: '你現在在職嗎？',
  type: QUESTION_TYPE.RADIO_ELSE_DATE,
  dataKey: DATA_KEY_CURRENTLY_EMPLOYED,
  required: true,
  defaultValue: [null, [null, null]],
  options: [{ label: '在職', value: 'yes' }, { label: '已離職', value: 'no' }],
  elseOptionValue: 'no',
  validateOrWarn: ([value, [year, month]], { elseOptionValue }) => {
    if (isNil(value)) return '請填寫是否在職';
    if (value === elseOptionValue) {
      if (isNil(year) || isNil(month))
        return `需填寫離職${joinCompact(' 及 ')(
          isNil(year) && '年份',
          isNil(month) && '月份',
        )}`;
      if (new Date(year, month - 1, 1) > new Date())
        return '離職年月不可以超過現在時間';
    }
    return null;
  },
});

export const createSectorQuestion = () => ({
  title: '廠區/門市/分公司',
  type: QUESTION_TYPE.TEXT,
  dataKey: DATA_KEY_SECTOR,
  defaultValue: '',
});

export const createEmployTypeQuestion = () => ({
  title: '職務型態',
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_EMPLOY_TYPE,
  required: true,
  defaultValue: null,
  options: employmentTypeOptions,
  validateOrWarn: value => isNil(value) && '請填寫職務型態',
});

export const createGenderQuestion = () => ({
  title: '性別',
  type: QUESTION_TYPE.RADIO,
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
  options: ['線上面試'].concat(REGION_OPTIONS),
});

export const createWorkRegionQuestion = () => ({
  title: '工作地區',
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_REGION,
  defaultValue: null,
  required: true,
  validateOrWarn: value => isNil(value) && '需填寫工作地區',
  options: REGION_OPTIONS,
});

export const createInterviewResultQuestion = () => ({
  title: '面試結果',
  type: QUESTION_TYPE.RADIO_ELSE,
  dataKey: DATA_KEY_RESULT,
  defaultValue: [null, ''],
  required: true,
  validateOrWarn: ([selected, elseText], { elseOptionValue }) => {
    if (isNil(selected)) return '需填寫面試結果';
    if (equals(selected, elseOptionValue)) {
      if (isEmpty(elseText)) return '需填寫面試結果';
      if (!within(1, 100, elseText.length)) return '面試結果僅限 1~100 字！';
    }
    return null;
  },
  options: RESULT_OPTIONS,
  elseOptionValue: last(RESULT_OPTIONS),
  placeholder: '輸入面試結果',
});

export const createJobTenureQuestion = () => ({
  title: ({ jobTitle }) => `從事${jobTitle}相關的工作多久？`,
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_JOB_TENURE,
  defaultValue: null,
  options: JOB_TENURE_OPTIONS,
});

export const createRequiredSalaryQuestion = ({ type }) => ({
  title: type === tabType.INTERVIEW_EXPERIENCE ? '面談薪資' : '薪資',
  type: QUESTION_TYPE.SELECT_TEXT,
  dataKey: DATA_KEY_SALARY,
  defaultValue: [null, ''],
  required: true,
  validateOrWarn: ([type, amount]) =>
    isNot(isNil, type) && (isEmpty(amount) || isNot(isSalaryAmount, amount))
      ? '需填寫薪資'
      : isNil(type) && isNot(isEmpty, amount)
      ? '需選擇薪水類型'
      : isEmpty(amount) || isNot(isSalaryAmount, amount)
      ? '需填寫薪資'
      : isNot(isValidSalary(type), amount)
      ? '薪資不合理。可能有少填寫 0，或薪資種類(年薪/月薪/日薪/時薪)選擇錯誤，請再檢查一次'
      : null,
  options: salaryTypeOptions,
  placeholder: '700,000',
  suffix: '元',
  hint: ([type, amount]) => {
    const { showWarning, hint } = salaryHint(type, amount);
    if (showWarning)
      return <span style={{ color: '#d0021b' }}>{hint}，確定嗎？</span>;
    else return hint;
  },
  footnote:
    type === tabType.INTERVIEW_EXPERIENCE
      ? '若錄取，請以包含平常的薪資、分紅、年終、獎金等預期會獲得的價值計算'
      : '薪資請以包含平常的薪資、分紅、年終、績效獎金等實質上獲得的價值去計算。',
});

export const createSalaryQuestion = ({ type }) => {
  const {
    required,
    validateOrWarn,
    ...question
  } = createRequiredSalaryQuestion({ type });
  return {
    ...question,
    validateOrWarn: ([type, amount]) =>
      isNil(type) && isEmpty(amount) ? null : validateOrWarn([type, amount]),
  };
};

export const createExperienceInYearQuestion = () => ({
  title: '當時業界工作經歷',
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_EXPERIENCE_IN_YEAR,
  required: true,
  defaultValue: null,
  options: range(0, 51).map(n => ({
    label: n === 0 ? '不到 1 年' : `${n} 年`,
    value: n,
  })),
  validateOrWarn: value => isNil(value) && '需填寫工作經歷',
});

const validateWorkingTime = (fieldName, min, max) => value => {
  if (isNot(isNumber, value)) {
    return `請填寫${fieldName}`;
  }
  if (value < min || value > max) {
    return `${fieldName}必須在${min}~${max}之間`;
  }
};

export const createDayPromisedWorkTimeQuestion = () => ({
  title: '工作日表訂工時(一日)',
  type: QUESTION_TYPE.TEXT,
  dataKey: DATA_KEY_DAY_PROMISED_WORK_TIME,
  required: true,
  defaultValue: '',
  validateOrWarn: validateWorkingTime('工作日表訂工時', 0, 24),
  placeholder: '8 或 8.5',
  footnote:
    '工作日指與雇主約定的上班日，或是排班排定的日子。一天表訂要工作多久。',
});

export const createDayRealWorkTimeQuestion = () => ({
  title: '工作日實際平均工時(一日)',
  type: QUESTION_TYPE.TEXT,
  dataKey: DATA_KEY_DAY_REAL_WORK_TIME,
  required: true,
  defaultValue: '',
  validateOrWarn: validateWorkingTime('工作日實際平均工時', 0, 24),
  placeholder: '8 或 8.5',
  footnote: (
    <Fragment>
      一天實際平均工時，包含在家工作、待命的時間。
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
  type: QUESTION_TYPE.TEXT,
  dataKey: DATA_KEY_WEEK_WORK_TIME,
  required: true,
  defaultValue: '',
  validateOrWarn: validateWorkingTime('一週總工時', 0, 168),
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

export const createInterviewSectionsQuestion = () => {
  const { validateOrWarnItem, ...rest } = createSectionsQuestion();
  return {
    ...rest,
    validateOrWarnItem: ([subject, rating, text]) => {
      if (UNRATABLE_SUBJECTS.includes(subject) === false && rating === 0)
        return '需選取滿意程度';
      if (wordCount(text) < SECTION_MIN_LENGTH) {
        return `至少 ${SECTION_MIN_LENGTH} 字，現在 ${wordCount(text)} 字`;
      }
      return null;
    },
    options: [
      '面試流程',
      '面試問題',
      '面試官專業度',
      '如何準備面試',
      '薪資福利',
      '性別友善度',
      '工作內容',
      '工時狀況',
      '工作環境',
      '自訂面向',
    ],
    placeholder: ([subject, rating, text]) => {
      switch (subject) {
        case '面試流程':
          return '整個面試的流程為何？有哪幾關面試、與誰面試？ 針對面試邀約的及時性、回饋的速度與詳細度，哪些方面讓您覺得面試流程良好或需要改善？';
        case '面試問題':
          return '面試的過程中具體問了哪一些問題？ 請列點詳述';
        case '面試官專業度':
          return '在面試的過程中，您認為面試官的專業度與態度為何？ 問題的深度，以及與問題工作的相關度為何？';
        case '如何準備面試':
          return '您是如何準備面試的？';
        case '薪資福利':
          return '底薪、績效獎金、年終獎金、三節獎金、分紅、津貼補助...等。';
        case '性別友善度':
          return '是否有詢問是否有小孩、生育計畫？ 公司對請生理假、產假或育嬰假的態度？';
        case '工作內容':
          return '面試時提到工作內容是什麼呢？';
        case '工時狀況':
          return '面試時提到的上下班時間、加班頻率如何？下班要收訊息嗎?';
        case '工作環境':
          return '在面試時看到的工作環境如何？ 是否乾淨、明亮、安全？';
        default:
          return '請輸入自訂標題（例如：環境整潔度）';
      }
    },
    hasRating: ([subject, rating, text]) =>
      UNRATABLE_SUBJECTS.includes(subject) === false,
    ratingLabels: ([subject, rating, text]) =>
      subject === '面試流程' ? RATING_COURSE_LABELS : RATING_LABELS,
  };
};

export const createSectionsQuestion = () => ({
  title: '至少評價兩個面向',
  type: QUESTION_TYPE.RADIO_RATING_TEXTAREA_LIST,
  dataKey: DATA_KEY_SECTIONS,
  required: true,
  defaultValue: [],
  validateOrWarn: (items, { validateOrWarnItem }) => {
    if (items.length < 2) return '至少評價兩個面向';
    for (const item of items) {
      const warning = validateOrWarnItem(item);
      if (warning) {
        const [subject] = item;
        return `${subject}：${warning}`;
      }
    }
  },
  validateOrWarnItem: ([subject, rating, text]) => {
    if (rating === 0) return '需選取滿意程度';
    if (wordCount(text) < SECTION_MIN_LENGTH) {
      return `至少 ${SECTION_MIN_LENGTH} 字，現在 ${wordCount(text)} 字`;
    }
    return null;
  },
  options: [
    '薪資福利',
    '性別友善度',
    '工作內容',
    '工時狀況',
    '公司/團隊文化',
    '公司管理方式',
    '獲得的成長',
    '升遷制度',
    '職場性騷擾',
    '職場霸凌',
    '自訂面向',
  ],
  elseOptionValue: '自訂面向',
  placeholder: ([subject, rating, text]) => {
    switch (subject) {
      case '薪資福利':
        return '底薪、績效獎金、年終獎金、三節獎金、分紅、津貼補助...等。';
      case '性別友善度':
        return '公司對請生理假、產假或育嬰假的態度？ 職場上對非主流性別或性傾向友善度？是否遇過性別歧視或騷擾的狀況？';
      case '工作內容':
        return '實際工作內容是什麼呢？與當初面試時說明的有不同嗎？';
      case '工時狀況':
        return '上下班時間、加班頻率如何？下班要收訊息嗎？';
      case '公司/團隊文化':
        return '上司的領導與溝通能力如何？同事間相處融洽嗎？團隊的氣氛讓人安心愉快嗎？';
      case '公司管理方式':
        return '是否符合勞基法？公司制度完不完善？管理方式讓員工感到舒適自在嗎？';
      case '獲得的成長':
        return '專業技術、管理團隊的經驗、對市場的瞭解、對廠商的溝通的技能等等。';
      case '升遷制度':
        return '是否有明確升遷、加薪制度？考核的標準透明嗎？';
      case '職場性騷擾':
        return '自身或同事是否曾遭遇性騷擾事件？如果是，公司的處理方式與態度為何？是否積極進行調查？是否懲處及隔離加害者避免性騷擾再度發生？';
      case '職場霸凌':
        return '自身或同事是否曾遭遇職場霸凌事件？如果是，請描述發生的情況，後續的舉報或救濟方式，以及公司處理的方式與態度';
      default:
        return '請輸入自訂標題（例如：環境整潔度）';
    }
  },
  ratingLabels: RATING_LABELS,
  footnote: value =>
    `至少 ${SECTION_MIN_LENGTH} 字，現在 ${wordCount(value)} 字`,
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

OptionEmoji.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

const OVERTIME_FREQUENCY_LABELS = ['幾乎不', '偶爾', '經常', '幾乎每天'];

export const createOvertimeFrequencyQuestion = () => ({
  title: '加班頻率',
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_OVERTIME_FREQUENCY,
  required: true,
  defaultValue: null,
  options: OVERTIME_FREQUENCY_LABELS.map((label, index) => ({
    label: <OptionEmoji value={index}>{label}</OptionEmoji>,
    value: index,
  })),
  validateOrWarn: value => isNil(value) && '需填寫加班頻率',
});

export const createOvertimeSalaryQuestion = () => ({
  title: '加班有無加班費',
  type: QUESTION_TYPE.RADIO_ELSE_RADIO,
  dataKey: DATA_KEY_HAS_OVERTIME_SALARY,
  defaultValue: [null, null],
  validateOrWarn: ([selected, elseValue], { elseOptionValue }) =>
    selected === elseOptionValue && elseValue === null
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
  type: QUESTION_TYPE.RADIO,
  dataKey: DATA_KEY_HAS_COMPENSATORY_DAYOFF,
  defaultValue: null,
  options: [
    { label: '有', value: 'yes' },
    { label: '沒有', value: 'no' },
    { label: '不知道', value: "don't know" },
  ],
});

export const createSensitiveQuestionsQuestion = () => ({
  title: '是否有以下特殊問題？',
  type: QUESTION_TYPE.CHECKBOX_ELSE,
  dataKey: DATA_KEY_SENSITIVE_QUESTIONS,
  defaultValue: [[], ''],
  validateOrWarn: ([selected, elseText], { elseOptionValue }) =>
    contains(elseOptionValue, selected) &&
    (isEmpty(elseText)
      ? '需填寫其他特殊問題的內容'
      : !within(1, 20, elseText.length)
      ? '面試中提及的特別問題僅限 1~20 字！'
      : null),
  options: SENSITIVE_QUESTIONS_OPTIONS,
  elseOptionValue: last(SENSITIVE_QUESTIONS_OPTIONS),
  placeholder: '輸入其他特殊問題內容',
});

const Count = () => {
  const count = useTotalCount();
  return <span>{Math.floor(count / 10000)}</span>;
};

export const createSubmitQuestion = ({ type }) => ({
  title: () => () => (
    <span>
      感謝你分享{tabTypeTranslation[type]}，按下「送出」，馬上就可以解鎖全站{' '}
      <Count /> 萬多筆資料哦！
    </span>
  ),
  type: QUESTION_TYPE.EMPTY,
  dataKey: '',
});
