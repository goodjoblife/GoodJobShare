import { PolicyReviewStatistics } from 'apis/queryCompanyPolicyReviewStatistics';
import { Policy, RemoteWorkPolicy } from 'constants/policy';

import {
  toAvailabilityDistribution,
  toLeaveSection,
} from './policyReviewStatistics';

const menstrualLeave: PolicyReviewStatistics = {
  policy: Policy.MENSTRUAL_LEAVE,
  hasPolicyCount: { yes: 15, no: 60, unknown: 25 },
  complianceCount: { yes: 10, no: 65, unknown: 25 },
  remoteWorkPolicyCount: null,
};

const flexibleWorkingHour: PolicyReviewStatistics = {
  policy: Policy.FLEXIBLE_WORKING_HOUR,
  hasPolicyCount: { yes: 1, no: 2, unknown: 1 },
  complianceCount: null,
  remoteWorkPolicyCount: null,
};

const remoteWork: PolicyReviewStatistics = {
  policy: Policy.REMOTE_WORK,
  hasPolicyCount: { yes: 8, no: 2, unknown: 0 },
  complianceCount: null,
  remoteWorkPolicyCount: [
    { remoteWorkPolicy: RemoteWorkPolicy.ONE_DAY_PER_WEEK, count: 5 },
    { remoteWorkPolicy: RemoteWorkPolicy.FOUR_DAYS_PER_WEEK, count: 2 },
    { remoteWorkPolicy: RemoteWorkPolicy.NO_LIMIT, count: 3 },
  ],
};

const statisticsList = [menstrualLeave, flexibleWorkingHour, remoteWork];

describe('toLeaveSection', () => {
  test('hasPolicyCount 轉為是/否/不知道分佈，dataCount 為三者總和', () => {
    expect(
      toLeaveSection(statisticsList, Policy.MENSTRUAL_LEAVE),
    ).toMatchObject({
      dataCount: 100,
      availability: {
        dataCount: 100,
        items: [
          { label: '是', percentage: 15 },
          { label: '否', percentage: 60 },
          { label: '不知道', percentage: 25 },
        ],
      },
    });
  });

  test('complianceCount 轉為法規符合度分佈', () => {
    const { compliance } = toLeaveSection(
      statisticsList,
      Policy.MENSTRUAL_LEAVE,
    );
    expect(compliance).toEqual({
      dataCount: 100,
      items: [
        { label: '符合勞基法', percentage: 10 },
        { label: '不符合勞基法', percentage: 65 },
        { label: '不知道', percentage: 25 },
      ],
    });
  });

  test('REMOTE_WORK 以每週天數分佈填入 compliance，四天與不限天數合併為「大於3天」', () => {
    const { compliance } = toLeaveSection(statisticsList, Policy.REMOTE_WORK);
    expect(compliance).toEqual({
      dataCount: 10,
      items: [
        { label: '1天', percentage: 50 },
        { label: '2天', percentage: 0 },
        { label: '3天', percentage: 0 },
        { label: '大於3天', percentage: 50 },
      ],
    });
  });

  test('FLEXIBLE_WORKING_HOUR 沒有 compliance', () => {
    expect(
      toLeaveSection(statisticsList, Policy.FLEXIBLE_WORKING_HOUR).compliance,
    ).toBeUndefined();
  });

  test('查無該制度或尚未取得資料時，仍回傳完整標籤的零分佈', () => {
    const expected = {
      dataCount: 0,
      availability: {
        dataCount: 0,
        items: [
          { label: '是', percentage: 0 },
          { label: '否', percentage: 0 },
          { label: '不知道', percentage: 0 },
        ],
      },
      compliance: undefined,
    };
    expect(toLeaveSection([], Policy.PARENTAL_LEAVE)).toEqual(expected);
    expect(toLeaveSection(null, Policy.PARENTAL_LEAVE)).toEqual(expected);
  });
});

describe('toAvailabilityDistribution', () => {
  test('只取 hasPolicyCount，百分比四捨五入', () => {
    expect(
      toAvailabilityDistribution(statisticsList, Policy.FLEXIBLE_WORKING_HOUR),
    ).toEqual({
      dataCount: 4,
      items: [
        { label: '是', percentage: 25 },
        { label: '否', percentage: 50 },
        { label: '不知道', percentage: 25 },
      ],
    });
  });
});
