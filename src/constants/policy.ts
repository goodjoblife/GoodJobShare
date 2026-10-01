import R from 'ramda';

export enum Policy {
  MENSTRUAL_LEAVE = 'MENSTRUAL_LEAVE',
  PARENTAL_LEAVE = 'PARENTAL_LEAVE',
  FAMILY_CARE_LEAVE = 'FAMILY_CARE_LEAVE',
  FLEXIBLE_WORKING_HOUR = 'FLEXIBLE_WORKING_HOUR',
  REMOTE_WORK = 'REMOTE_WORK',
}

export const policyTranslation: Record<Policy, string> = {
  [Policy.MENSTRUAL_LEAVE]: '生理假',
  [Policy.PARENTAL_LEAVE]: '育嬰假',
  [Policy.FAMILY_CARE_LEAVE]: '家庭照顧假',
  [Policy.FLEXIBLE_WORKING_HOUR]: '彈性上下班時間',
  [Policy.REMOTE_WORK]: '遠端工作',
};

export enum YesNoOrUnknown {
  yes = 'yes',
  no = 'no',
  unknown = 'unknown',
}

export const hasPolicyTranslation: Record<YesNoOrUnknown, string> = {
  [YesNoOrUnknown.yes]: '有',
  [YesNoOrUnknown.no]: '沒有',
  [YesNoOrUnknown.unknown]: '不知道',
};

// 表單把「優於」與「符合」都送成 yes，所以這裡只還原得到「符合」
export const complianceTranslation: Record<YesNoOrUnknown, string> = {
  [YesNoOrUnknown.yes]: '符合性別平等工作法',
  [YesNoOrUnknown.no]: '不符合性別平等工作法',
  [YesNoOrUnknown.unknown]: '不清楚是否符合性別平等工作法',
};

export enum RemoteWorkPolicy {
  ONE_DAY_PER_WEEK = 'ONE_DAY_PER_WEEK',
  TWO_DAYS_PER_WEEK = 'TWO_DAYS_PER_WEEK',
  THREE_DAYS_PER_WEEK = 'THREE_DAYS_PER_WEEK',
  FOUR_DAYS_PER_WEEK = 'FOUR_DAYS_PER_WEEK',
  NO_LIMIT = 'NO_LIMIT',
}

export const remoteWorkPolicyTranslation: Record<RemoteWorkPolicy, string> = {
  [RemoteWorkPolicy.ONE_DAY_PER_WEEK]: '每週一天',
  [RemoteWorkPolicy.TWO_DAYS_PER_WEEK]: '每週兩天',
  [RemoteWorkPolicy.THREE_DAYS_PER_WEEK]: '每週三天',
  [RemoteWorkPolicy.FOUR_DAYS_PER_WEEK]: '每週四天',
  [RemoteWorkPolicy.NO_LIMIT]: '不限天數',
};

// 表單的選項文字就是上面那幾張對照表的值，所以反查表直接從它們產生，
// 中文字串只會有一份。見 ShareExperience/questionCreators 的 label / elseOptions。
const inverse = <T extends string>(
  translation: Record<T, string>,
): Record<string, T> => R.invertObj(translation) as Record<string, T>;

export const policyByLabel = inverse(policyTranslation);

export const remoteWorkPolicyByLabel = inverse(remoteWorkPolicyTranslation);

export type PolicyReview = {
  policy: Policy;
  hasPolicy: YesNoOrUnknown;
  compliance: YesNoOrUnknown | null;
  remoteWorkPolicy: RemoteWorkPolicy | null;
  review: string | null;
};

// 「有・符合性別平等工作法」、「有・每週兩天」、「不知道」
export const policyAnswerOf = ({
  hasPolicy,
  compliance,
  remoteWorkPolicy,
}: PolicyReview): string =>
  [
    hasPolicyTranslation[hasPolicy],
    compliance && complianceTranslation[compliance],
    remoteWorkPolicy && remoteWorkPolicyTranslation[remoteWorkPolicy],
  ]
    .filter(Boolean)
    .join('・');
