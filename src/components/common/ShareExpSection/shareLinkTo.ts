export const STATE_SHARE = {
  INTERVIEW: 'interview',
  WORK_EXPERIENCE: 'work-experience',
  SALARY_WORK_TIME: 'salary-work-times',
  SALARY_WORK_TIME_NO_PROGRESS_BAR: 'salary-work-times-no-progress-bar',
  POLICY: 'policy',
};

// 表單的預填值。放在 history state 裡，由 questionCreators 的 defaultValue 讀取
export type SharePrefill = {
  companyName?: string;
  jobTitle?: string;
};

export type ShareLinkTo = {
  state: {
    share: string;
  } & SharePrefill;
};

// 沒給的欄位就不要放進 state，讓表單走自己的預設值
const generateShareTypeForm = (share: string) => ({
  companyName,
  jobTitle,
}: SharePrefill = {}): ShareLinkTo => ({
  state: {
    share,
    ...(companyName ? { companyName } : {}),
    ...(jobTitle ? { jobTitle } : {}),
  },
});

// please follow the convention: () => To (react-router)
export const generateShareInterviewTypeForm = generateShareTypeForm(
  STATE_SHARE.INTERVIEW,
);
export const generateShareTimeSalaryTypeForm = generateShareTypeForm(
  STATE_SHARE.SALARY_WORK_TIME,
);
export const generateShareTimeSalaryTypeFormHideProgressBar = generateShareTypeForm(
  STATE_SHARE.SALARY_WORK_TIME_NO_PROGRESS_BAR,
);
export const generateShareWork = generateShareTypeForm(
  STATE_SHARE.WORK_EXPERIENCE,
);
export const generateSharePolicyForm = generateShareTypeForm(
  STATE_SHARE.POLICY,
);
