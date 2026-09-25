import { Policy, RemoteWorkPolicy, YesNoOrUnknown } from 'constants/policy';

// Must be the same as graphql schema (PolicyReview)，只取彈窗需要的欄位
export type PolicyReviewInGroup = {
  id: string;
  policy: Policy;
  hasPolicy: YesNoOrUnknown;
  compliance: YesNoOrUnknown | null;
  remoteWorkPolicy: RemoteWorkPolicy | null;
  review: string | null;
};

// Must be the same as graphql schema (PolicyReviewGroup)，
// 另外加上 policyReviews（彈窗要顯示組內每一筆的內容）
export type PolicyReviewGroup = {
  groupId: string;
  company: { name: string };
  jobTitle: string;
  sector: string | null;
  status: 'published' | 'hidden';
  archive: { is_archived: boolean; reason: string };
  createdAt: string;
  policyReviews: PolicyReviewInGroup[];
};

// TODO: 後端 me.policyReviewGroupList 接上後移除這份假資料
const fakePolicyReviewGroups: PolicyReviewGroup[] = [
  {
    groupId: 'fake-policy-review-group-1',
    company: { name: '好工作股份有限公司' },
    jobTitle: '前端工程師',
    sector: '台北總部',
    status: 'published',
    archive: { is_archived: false, reason: '' },
    createdAt: '2026-09-01T03:00:00.000Z',
    policyReviews: [
      {
        id: 'fake-policy-review-1',
        policy: Policy.MENSTRUAL_LEAVE,
        hasPolicy: YesNoOrUnknown.YES,
        compliance: YesNoOrUnknown.YES,
        remoteWorkPolicy: null,
        review: '每月一天，跟主管口頭說一聲就可以請，不用附證明。',
      },
      {
        id: 'fake-policy-review-2',
        policy: Policy.PARENTAL_LEAVE,
        hasPolicy: YesNoOrUnknown.YES,
        compliance: YesNoOrUnknown.UNKNOWN,
        remoteWorkPolicy: null,
        review: '有同事請過半年，回來後職務沒有變動。',
      },
      {
        id: 'fake-policy-review-3',
        policy: Policy.FAMILY_CARE_LEAVE,
        hasPolicy: YesNoOrUnknown.UNKNOWN,
        compliance: null,
        remoteWorkPolicy: null,
        review: null,
      },
      {
        id: 'fake-policy-review-4',
        policy: Policy.FLEXIBLE_WORKING_HOUR,
        hasPolicy: YesNoOrUnknown.YES,
        compliance: null,
        remoteWorkPolicy: null,
        review: '9:00 ~ 11:00 之間到公司都可以，滿八小時下班。',
      },
      {
        id: 'fake-policy-review-5',
        policy: Policy.REMOTE_WORK,
        hasPolicy: YesNoOrUnknown.YES,
        compliance: null,
        remoteWorkPolicy: RemoteWorkPolicy.TWO_DAYS_PER_WEEK,
        review: '週三、週五可以遠端，需要事先在系統上登記。',
      },
    ],
  },
  {
    groupId: 'fake-policy-review-group-2',
    company: { name: '透明化科技有限公司' },
    jobTitle: '產品經理',
    sector: null,
    status: 'hidden',
    archive: { is_archived: false, reason: '' },
    createdAt: '2026-08-12T06:30:00.000Z',
    policyReviews: [
      {
        id: 'fake-policy-review-6',
        policy: Policy.MENSTRUAL_LEAVE,
        hasPolicy: YesNoOrUnknown.NO,
        compliance: null,
        remoteWorkPolicy: null,
        review: '請假系統裡沒有這個選項，只能請事假。',
      },
      {
        id: 'fake-policy-review-7',
        policy: Policy.REMOTE_WORK,
        hasPolicy: YesNoOrUnknown.NO,
        compliance: null,
        remoteWorkPolicy: null,
        review: null,
      },
    ],
  },
];

export default fakePolicyReviewGroups;
