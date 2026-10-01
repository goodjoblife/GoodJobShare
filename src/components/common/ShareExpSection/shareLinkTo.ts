export const STATE_SHARE = {
  INTERVIEW: 'interview',
  WORK_EXPERIENCE: 'work-experience',
  SALARY_WORK_TIME: 'salary-work-times',
  SALARY_WORK_TIME_NO_PROGRESS_BAR: 'salary-work-times-no-progress-bar',
  POLICY: 'policy',
  POLICY_REVIEW_GROUP: 'policy-review-group',
};

type ShareLinkTo = {
  state: {
    share: string;
    companyName?: string;
    policyReviewGroupId?: string;
  };
};

// please follow the convention: () => To (react-router)
export const generateShareInterviewTypeForm = ({
  companyName,
}: { companyName?: string } = {}): ShareLinkTo => {
  if (companyName) {
    return { state: { share: STATE_SHARE.INTERVIEW, companyName } };
  }
  return { state: { share: STATE_SHARE.INTERVIEW } };
};
export const generateShareTimeSalaryTypeForm = (): ShareLinkTo => ({
  state: { share: STATE_SHARE.SALARY_WORK_TIME },
});
export const generateShareTimeSalaryTypeFormHideProgressBar = (): ShareLinkTo => ({
  state: { share: STATE_SHARE.SALARY_WORK_TIME_NO_PROGRESS_BAR },
});
export const generateShareWork = (): ShareLinkTo => ({
  state: { share: STATE_SHARE.WORK_EXPERIENCE },
});
export const generateSharePolicyForm = (): ShareLinkTo => ({
  state: { share: STATE_SHARE.POLICY },
});
export const generatePolicyReviewGroupModal = (
  policyReviewGroupId: string,
): ShareLinkTo => ({
  state: { share: STATE_SHARE.POLICY_REVIEW_GROUP, policyReviewGroupId },
});
