import {
  Policy,
  policyByLabel,
  policyTranslation,
  RemoteWorkPolicy,
  remoteWorkPolicyByLabel,
  remoteWorkPolicyTranslation,
} from './policy';

describe('policyByLabel', () => {
  // 這幾個中文字串就是 ShareExperience/questionCreators 的 label，
  // 表單送出時靠它們換回 enum，改了對照表就會在這裡被擋下來
  it('maps the form labels back to the policy enum', () => {
    expect(policyByLabel).toEqual({
      生理假: Policy.MENSTRUAL_LEAVE,
      育嬰假: Policy.PARENTAL_LEAVE,
      家庭照顧假: Policy.FAMILY_CARE_LEAVE,
      彈性上下班時間: Policy.FLEXIBLE_WORKING_HOUR,
      遠端工作: Policy.REMOTE_WORK,
    });
  });

  it('round-trips every policy', () => {
    Object.values(Policy).forEach(policy => {
      expect(policyByLabel[policyTranslation[policy]]).toBe(policy);
    });
  });
});

describe('remoteWorkPolicyByLabel', () => {
  // 對應 createRemoteWorkQuestion 的 elseOptions
  it('maps the form options back to the remote work policy enum', () => {
    expect(remoteWorkPolicyByLabel).toEqual({
      每週一天: RemoteWorkPolicy.ONE_DAY_PER_WEEK,
      每週兩天: RemoteWorkPolicy.TWO_DAYS_PER_WEEK,
      每週三天: RemoteWorkPolicy.THREE_DAYS_PER_WEEK,
      每週四天: RemoteWorkPolicy.FOUR_DAYS_PER_WEEK,
      不限天數: RemoteWorkPolicy.NO_LIMIT,
    });
  });

  it('round-trips every remote work policy', () => {
    Object.values(RemoteWorkPolicy).forEach(remoteWorkPolicy => {
      expect(
        remoteWorkPolicyByLabel[remoteWorkPolicyTranslation[remoteWorkPolicy]],
      ).toBe(remoteWorkPolicy);
    });
  });
});
