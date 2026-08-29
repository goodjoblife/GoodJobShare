import React from 'react';

import PolicyLawNote from './PolicyLawNote';

export type PolicyOption = {
  label: string;
  value: string;
  // Must be the same as graphql schema (Policy)
  policy: string;
  radioTitle: string;
  radioOptions: string[];
  radioElseOptionValue?: string;
  radioElseOptions?: string[];
  radioFooter?: React.ReactNode;
  textTitle: string;
  textPlaceholder: string;
  hasText: (value: unknown[]) => boolean;
};

export const POLICY_OPTIONS: PolicyOption[] = [
  {
    label: '生理假',
    value: '生理假',
    policy: 'MENSTRUAL_LEAVE',
    radioTitle: '自己或同事是否請得到生理假？',
    radioOptions: ['是', '否', '不知道'],
    radioElseOptionValue: '是',
    radioElseOptions: [
      '有，優於性別平等工作法',
      '有，符合性別平等工作法',
      '有，不符合性別平等工作法',
      '有，不清楚是否符合性別平等工作法',
    ],
    radioFooter: (
      <PolicyLawNote lawName="性別平等工作法">
        女性受僱者因生理日致工作有困難者，每月得請生理假一日。生理假薪資，減半發給。
      </PolicyLawNote>
    ),
    textTitle: '請分享自身或同事請生理假的實際狀況',
    textPlaceholder:
      '請生理假是否曾經遇到什麼困難？生理假薪資有正常給嗎（減半），或是有更好的福利？',
    hasText: ([, v]: unknown[]) => v === '是' || v === '否',
  },
  {
    label: '育嬰假',
    value: '育嬰假',
    policy: 'PARENTAL_LEAVE',
    radioTitle: '自己或同事是否請得到育嬰假？',
    radioOptions: ['是', '否', '不知道'],
    radioElseOptionValue: '是',
    radioElseOptions: [
      '有，優於性別平等工作法',
      '有，符合性別平等工作法',
      '有，不符合性別平等工作法',
      '有，不清楚是否符合性別平等工作法',
    ],
    radioFooter: (
      <PolicyLawNote lawName="性別平等工作法">
        工作年資 6 個月以上，子女未滿 3
        歲的雙親，可分別申請育嬰假（育嬰留職停薪），最長 2 年。2026
        年起可以「日」為單位請育嬰假。
      </PolicyLawNote>
    ),
    textTitle: '請分享自身或同事請育嬰假/育嬰留職停薪的實際狀況',
    textPlaceholder:
      '自身、或有看過同事請育嬰假嗎？育嬰假是否曾經遇到什麼困難？公司有額外的育嬰福利嗎？（例如：多給幾天給薪育嬰假）',
    hasText: ([, v]: unknown[]) => v === '是' || v === '否',
  },
  {
    label: '家庭照顧假',
    value: '家庭照顧假',
    policy: 'FAMILY_CARE_LEAVE',
    radioTitle: '自己或同事是否請得到家庭照顧假？',
    radioOptions: ['是', '否', '不知道'],
    radioElseOptionValue: '是',
    radioElseOptions: [
      '有，優於性別平等工作法',
      '有，符合性別平等工作法',
      '有，不符合性別平等工作法',
      '有，不清楚是否符合性別平等工作法',
    ],
    radioFooter: (
      <PolicyLawNote lawName="性別平等工作法">
        家庭照顧假一年至多 7
        天，不得扣全勤獎金、影響考績或其他不利行為，屬主不得拒絕。
      </PolicyLawNote>
    ),
    textTitle: '請分享自身或同事家庭照顧假的實際狀況',
    textPlaceholder:
      '自身、或有看過同事請家庭照顧假嗎？請家庭照顧假是否曾經遇到什麼困難？公司有額外的家庭照顧假福利嗎？（例如：多給幾天給薪家庭照顧假）',
    hasText: ([, v]: unknown[]) => v === '是' || v === '否',
  },
  {
    label: '彈性上下班時間',
    value: '彈性上下班時間',
    policy: 'FLEXIBLE_WORKING_HOUR',
    radioTitle: '是否有彈性上下班時間制度？',
    radioOptions: ['有', '沒有', '不知道'],
    textTitle: '請分享彈性上下班時間制度、實際狀況',
    textPlaceholder:
      '彈性上班的時間範圍？彈性下班的時間範圍？實際上來說，是否有同事或自身真的可以運用到彈性上下班？',
    hasText: ([, v]: unknown[]) => v === '有',
  },
  {
    label: '遠端工作',
    value: '遠端工作',
    policy: 'REMOTE_WORK',
    radioTitle: '是否可以遠端工作？',
    radioOptions: ['是', '否', '不知道'],
    radioElseOptionValue: '是',
    radioElseOptions: [
      '每週一天',
      '每週兩天',
      '每週三天',
      '每週四天',
      '不限天數',
    ],
    textTitle: '請分享遠端工作的實際狀況',
    textPlaceholder:
      '一週可以遠端工作幾天？需要先申請或報備嗎？若公司以遠端工作為主，是否有額外的方式讓團隊成員更加認識彼此？',
    hasText: ([, v]: unknown[]) => v === '是',
  },
];
