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

// Must be the same as graphql schema (RemoteWorkPolicyEnum)
export enum RemoteWorkPolicy {
  ONE_DAY_PER_WEEK = 'ONE_DAY_PER_WEEK',
  TWO_DAYS_PER_WEEK = 'TWO_DAYS_PER_WEEK',
  THREE_DAYS_PER_WEEK = 'THREE_DAYS_PER_WEEK',
  FOUR_DAYS_PER_WEEK = 'FOUR_DAYS_PER_WEEK',
  NO_LIMIT = 'NO_LIMIT',
}

// FOUR_DAYS_PER_WEEK 與 NO_LIMIT 都歸到「大於3天」這一欄。
export const remoteWorkPolicyTranslation: Record<RemoteWorkPolicy, string> = {
  [RemoteWorkPolicy.ONE_DAY_PER_WEEK]: '1天',
  [RemoteWorkPolicy.TWO_DAYS_PER_WEEK]: '2天',
  [RemoteWorkPolicy.THREE_DAYS_PER_WEEK]: '3天',
  [RemoteWorkPolicy.FOUR_DAYS_PER_WEEK]: '大於3天',
  [RemoteWorkPolicy.NO_LIMIT]: '大於3天',
};
