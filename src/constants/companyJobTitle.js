const JOB_TITLE = 'JOB_TITLE';
const COMPANY = 'COMPANY';

export const pageType = { JOB_TITLE, COMPANY };
export const pageTypeTranslation = {
  [JOB_TITLE]: '職稱',
  [COMPANY]: '公司',
};

export const pageTypeURLMap = {
  [JOB_TITLE]: 'job-titles',
  [COMPANY]: 'companies',
};

const OVERVIEW = 'OVERVIEW';
const TIME_AND_SALARY = 'TIME_AND_SALARY';
const WORK_EXPERIENCE = 'WORK_EXPERIENCE';
const INTERVIEW_EXPERIENCE = 'INTERVIEW_EXPERIENCE';

export const tabType = {
  OVERVIEW,
  TIME_AND_SALARY,
  WORK_EXPERIENCE,
  INTERVIEW_EXPERIENCE,
};

export const tabTypeTranslation = {
  [OVERVIEW]: '總覽',
  [TIME_AND_SALARY]: '薪水&加班狀況',
  [WORK_EXPERIENCE]: '工作心得',
  [INTERVIEW_EXPERIENCE]: '面試心得',
};

export const tabTypeURLMap = {
  [OVERVIEW]: '',
  [TIME_AND_SALARY]: 'salary-work-times',
  [WORK_EXPERIENCE]: 'work-experiences',
  [INTERVIEW_EXPERIENCE]: 'interview-experiences',
};
