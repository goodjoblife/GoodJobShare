export const STATE_SHARE = {
  INTERVIEW: 'interview',
  WORK_EXPERIENCE: 'work-experience',
  SALARY_WORK_TIME: 'salary-work-times',
  SALARY_WORK_TIME_NO_PROGRESS_BAR: 'salary-work-times-no-progress-bar',
  WORKPLACE_ASPECTS: 'workplace-aspects',
};

// please follow the convention: () => To (react-router)
export const generateShareInterviewTypeForm = ({ companyName } = {}) => {
  if (companyName) {
    return { state: { share: STATE_SHARE.INTERVIEW, companyName } };
  }
  return { state: { share: STATE_SHARE.INTERVIEW } };
};
export const generateShareTimeSalaryTypeForm = () => ({
  state: { share: STATE_SHARE.SALARY_WORK_TIME },
});
export const generateShareTimeSalaryTypeFormHideProgressBar = () => ({
  state: { share: STATE_SHARE.SALARY_WORK_TIME_NO_PROGRESS_BAR },
});
export const generateShareWork = () => ({
  state: { share: STATE_SHARE.WORK_EXPERIENCE },
});
export const generateShareWorkplaceAspectsForm = () => ({
  state: { share: STATE_SHARE.WORKPLACE_ASPECTS },
});
