import qs from 'qs';

export const STATE_SHARE = {
  INTERVIEW: 'interview',
  SALARY_WORK_TIME: 'salary-work-times',
  SALARY_WORK_TIME_NO_PROGRESS_BAR: 'salary-work-times-no-progress-bar',
};

export const generateShareInterviewOnePage = () => '/share/interview-one-page';
export const generateShareInterview3Steps = ({ companyName } = {}) => {
  if (companyName) {
    const search = qs.stringify({ companyName }, { addQueryPrefix: true });
    return `/share/interview${search}`;
  }
  return '/share/interview/step1';
};
export const generateShareInterviewTypeForm = ({ companyName } = {}) => {
  if (companyName) {
    return { state: { share: STATE_SHARE.INTERVIEW, companyName } };
  }
  return { state: { share: STATE_SHARE.INTERVIEW } };
};
export const generateShareTimeSalaryOnePage = () => '/share/time-and-salary';
export const generateShareTimeSalaryTypeForm = () => ({
  state: { share: STATE_SHARE.SALARY_WORK_TIME },
});
export const generateShareTimeSalaryTypeFormHideProgressBar = () => ({
  state: { share: STATE_SHARE.SALARY_WORK_TIME_NO_PROGRESS_BAR },
});
export const generateShareWork = () => '/share/work-experiences';
