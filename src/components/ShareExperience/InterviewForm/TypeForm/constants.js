import { range } from 'ramda';

export const DATA_KEY_COMPANY_NAME = 'companyName';
export const DATA_KEY_JOB_TITLE = 'jobTitle';
export const DATA_KEY_DATE = 'interviewTime';
export const DATA_KEY_REGION = 'region';
export const DATA_KEY_RESULT = 'interviewResult';
export const DATA_KEY_RATING = 'overallRating';
export const DATA_KEY_COURSE = 'interviewContent';
export const DATA_KEY_SUGGESTIONS = 'suggestions';
export const DATA_KEY_JOB_TENURE = 'experienceInYear';
export const DATA_KEY_SALARY = 'salary';
export const DATA_KEY_QUESTIONS = 'interviewQas';
export const DATA_KEY_SENSITIVE_QUESTIONS = 'sensitiveQuestions';

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

export const RATING_LABELS = ['差', '普通', '不錯啦～', '很好！', '大推！'];

export const COURSE_MIN_LENGTH = 50;

export const SUGGESTIONS_MIN_LENGTH = 50;

export const JOB_TENURE_OPTIONS = [
  '不到 1 年',
  ...range(0, 51).map(n => `${n} 年`),
];

export const SALARY_TYPE_VALUE_BY_OPTION = {
  年薪: 'year',
  月薪: 'month',
  日薪: 'day',
  時薪: 'hour',
};

export const SENSITIVE_QUESTIONS_OPTIONS = [
  '詢問家庭狀況',
  '曾詢問婚姻狀況、生育計畫',
  '曾要求繳交身分證、保證金',
  '其他',
];
