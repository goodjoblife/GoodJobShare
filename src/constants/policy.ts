// Must be the same as graphql schema (PolicyEnum)
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

// Must be the same as graphql schema (YesNoOrUnknown)
export enum YesNoOrUnknown {
  YES = 'yes',
  NO = 'no',
  UNKNOWN = 'unknown',
}

export const hasPolicyTranslation: Record<YesNoOrUnknown, string> = {
  [YesNoOrUnknown.YES]: '有',
  [YesNoOrUnknown.NO]: '沒有',
  [YesNoOrUnknown.UNKNOWN]: '不知道',
};

export const complianceTranslation: Record<YesNoOrUnknown, string> = {
  [YesNoOrUnknown.YES]: '符合性別平等工作法',
  [YesNoOrUnknown.NO]: '不符合性別平等工作法',
  [YesNoOrUnknown.UNKNOWN]: '不清楚是否符合性別平等工作法',
};

// Must be the same as graphql schema (RemoteWorkPolicyEnum)
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
