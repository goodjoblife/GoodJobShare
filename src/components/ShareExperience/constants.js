import { range } from 'ramda';

export const DATA_KEY_COMPANY_NAME = 'companyName';
export const DATA_KEY_JOB_TITLE = 'jobTitle';
export const DATA_KEY_CURRENTLY_EMPLOYED = 'isCurrentlyEmployed';
export const DATA_KEY_SECTOR = 'sector';
export const DATA_KEY_EMPLOY_TYPE = 'employType';
export const DATA_KEY_GENDER = 'gender';
export const DATA_KEY_DATE = 'interviewTime';
export const DATA_KEY_REGION = 'region';
export const DATA_KEY_RESULT = 'interviewResult';
export const DATA_KEY_JOB_TENURE = 'experienceInYear';
export const DATA_KEY_SALARY = 'salary';
export const DATA_KEY_EXPERIENCE_IN_YEAR = 'experienceInYear';
export const DATA_KEY_DAY_PROMISED_WORK_TIME = 'dayPromisedWorkTime';
export const DATA_KEY_DAY_REAL_WORK_TIME = 'dayRealWorkTime';
export const DATA_KEY_WEEK_WORK_TIME = 'weekWorkTime';
export const DATA_KEY_OVERTIME_FREQUENCY = 'overtimeFrequency';
export const DATA_KEY_HAS_OVERTIME_SALARY = 'hasOvertimeSalary';
export const DATA_KEY_HAS_COMPENSATORY_DAYOFF = 'hasCompensatoryDayoff';
export const DATA_KEY_SENSITIVE_QUESTIONS = 'sensitiveQuestions';
export const DATA_KEY_SECTIONS = 'sections';

export const REGION_OPTIONS = [
  '基隆市',
  '臺北市',
  '新北市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '臺中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '高雄市',
  '屏東縣',
  '臺東縣',
  '花蓮縣',
  '宜蘭縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
];

export const RESULT_OPTIONS = ['錄取', '未錄取', '沒通知', '其他'];

export const UNRATABLE_SUBJECTS = ['面試問題', '如何準備面試', '工作內容'];

export const RATING_LABELS = ['差', '普通', '不錯啦～', '很好！', '大推！'];

export const RATING_COURSE_LABELS = [
  '非常混亂',
  '有些混亂',
  '普通',
  '大致順暢',
  '非常順暢',
];

export const SECTION_MIN_LENGTH = 30;

export const JOB_TENURE_OPTIONS = [
  '不到 1 年',
  ...range(1, 51).map(n => `${n} 年`),
];

export const SENSITIVE_QUESTIONS_OPTIONS = [
  '詢問家庭狀況',
  '曾詢問婚姻狀況、生育計畫',
  '曾要求繳交身分證、保證金',
  '其他',
];
