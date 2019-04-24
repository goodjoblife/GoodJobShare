export const VALID = 'valid';
export const INVALID = 'invalid';
export const COMPANY = 'company';
export const REGION = 'region';
export const JOB_TITLE = 'job_title';
export const EMPLOYMENT_TYPE = 'employment_type';

export const SALARY_TYPE = 'salary_type';
export const SALARY_AMOUNT = 'salary_amount';
export const EXPERIENCE_IN_YEAR = 'experience_in_year';
export const DAY_PROMISED_WORK_TIME = 'day_promised_work_time';
export const DAY_REAL_WORK_TIME = 'day_real_work_time';
export const WEEK_WORK_TIME = 'week_work_time';
export const OVERTIME_FREQUENCY = 'overtime_frequency';

export const INTERVIEW_TIME = 'interview_time';
export const INTERVIEW_RESULT = 'interview_result';
export const INTERVIEW_SENSITIVE_QUESTIONS = 'interview_sensitive_questions';
export const OVERALL_RATING = 'overall_rating';
export const TITLE = 'title';
export const SECTIONS = 'sections';
export const EXPERIENCE_SECTION = 'experience_section';
export const SUGGESTION_SECTION = 'suggestion_section';
export const INTERVIEW_QAS = 'INTERVIEW_QAS';
export const COMMENT_ZONE = 'comment_zone';

export const INTERVIEW_FORM_ORDER = [
  COMPANY,
  REGION,
  JOB_TITLE,
  INTERVIEW_TIME,
  INTERVIEW_RESULT,
  OVERALL_RATING,
  TITLE,
  SECTIONS,
  EXPERIENCE_SECTION,
  INTERVIEW_QAS,
  INTERVIEW_SENSITIVE_QUESTIONS,
  SUGGESTION_SECTION,
];

export const INTERVIEW_FORM_STEPS = [
  [COMPANY, REGION, JOB_TITLE],
  [INTERVIEW_TIME, INTERVIEW_RESULT, OVERALL_RATING, TITLE],
  [
    EXPERIENCE_SECTION,
    INTERVIEW_QAS,
    INTERVIEW_SENSITIVE_QUESTIONS,
    SUGGESTION_SECTION,
  ],
];

export const TIME_SALARY_BASIC_ORDER = [COMPANY, JOB_TITLE, EMPLOYMENT_TYPE];

export const TIME_SALARY_EXT_ORDER = [
  SALARY_TYPE,
  SALARY_AMOUNT,
  EXPERIENCE_IN_YEAR,
  DAY_PROMISED_WORK_TIME,
  DAY_REAL_WORK_TIME,
  WEEK_WORK_TIME,
  OVERTIME_FREQUENCY,
];

export const WORK_FORM_ORDER = [COMPANY, REGION, JOB_TITLE, TITLE, SECTIONS];
