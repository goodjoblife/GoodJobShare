import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { PolicyReviewGroup } from 'apis/queryPolicyReviewGroup';
import { Policy, RemoteWorkPolicy, YesNoOrUnknown } from 'constants/policy';
import FetchBox, { getFetched, getUnfetched, toFetching } from 'utils/fetchBox';

import PolicyReviewGroupDetail from './PolicyReviewGroupDetail';

const group: PolicyReviewGroup = {
  groupId: 'group-1',
  company: { name: '好工作股份有限公司' },
  jobTitle: '前端工程師',
  sector: '台北總部',
  createdAt: '2026-01-02T00:00:00.000Z',
  policyReviews: [
    {
      policy: Policy.MENSTRUAL_LEAVE,
      hasPolicy: YesNoOrUnknown.yes,
      compliance: YesNoOrUnknown.yes,
      remoteWorkPolicy: null,
      review: '每月一天，跟主管口頭說一聲就可以請，不用附證明。',
    },
    {
      policy: Policy.FAMILY_CARE_LEAVE,
      hasPolicy: YesNoOrUnknown.unknown,
      compliance: null,
      remoteWorkPolicy: null,
      review: null,
    },
    {
      policy: Policy.REMOTE_WORK,
      hasPolicy: YesNoOrUnknown.yes,
      compliance: null,
      remoteWorkPolicy: RemoteWorkPolicy.TWO_DAYS_PER_WEEK,
      review: null,
    },
  ],
};

const renderDetail = (
  box: FetchBox<PolicyReviewGroup> = getFetched(group),
): void => {
  render(<PolicyReviewGroupDetail box={box} />);
};

// prettier 的 TypeScript parser 不吃 ?.，所以用 as 斷言往上走
const parentOf = (element: HTMLElement): HTMLElement =>
  element.parentElement as HTMLElement;

describe('PolicyReviewGroupDetail', () => {
  it('shows the company and job title of the group', () => {
    renderDetail();

    expect(
      screen.getByText('好工作股份有限公司 － 前端工程師'),
    ).toBeInTheDocument();
  });

  it('shows the sector of the group', () => {
    renderDetail();

    expect(screen.getByText('台北總部')).toBeInTheDocument();
  });

  it('omits the sector line when the group has none', () => {
    renderDetail(getFetched({ ...group, sector: null }));

    expect(screen.queryByText('台北總部')).not.toBeInTheDocument();
    expect(
      screen.getByText('好工作股份有限公司 － 前端工程師'),
    ).toBeInTheDocument();
  });

  it('shows when the group was shared, under the sector', () => {
    renderDetail();

    const sector = screen.getByText('台北總部');
    const sharedAt = screen.getByText('分享於 2026.1.2');
    expect(sharedAt).toBeInTheDocument();
    // 分享日期在廠區下面一行
    expect(
      sector.compareDocumentPosition(sharedAt) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('puts the policy reviews in their own container', () => {
    renderDetail();

    // 每一項制度都有上框線；它們自成一個容器，所以標題與第一項之間就有一條線，
    // 而標題那幾行不會被畫到。
    const policyReviews = parentOf(parentOf(screen.getByText('生理假')));

    expect(policyReviews.children).toHaveLength(3);
    expect(policyReviews.contains(screen.getByText('台北總部'))).toBe(false);
    expect(policyReviews.contains(screen.getByText('分享於 2026.1.2'))).toBe(
      false,
    );
  });

  it('lists every policy review in the group', () => {
    renderDetail();

    expect(screen.getByText('生理假')).toBeInTheDocument();
    expect(screen.getByText('家庭照顧假')).toBeInTheDocument();
    expect(screen.getByText('遠端工作')).toBeInTheDocument();
  });

  it('joins the answer with its compliance', () => {
    renderDetail();

    expect(screen.getByText('有・符合性別平等工作法')).toBeInTheDocument();
    expect(
      screen.getByText('每月一天，跟主管口頭說一聲就可以請，不用附證明。'),
    ).toBeInTheDocument();
  });

  it('joins the answer with its remote work policy', () => {
    renderDetail();

    expect(screen.getByText('有・每週兩天')).toBeInTheDocument();
  });

  it('shows the answer alone when the policy was answered unknown', () => {
    renderDetail();

    expect(screen.getByText('不知道')).toBeInTheDocument();
  });

  it('shows nothing before the group has been fetched', () => {
    renderDetail(getUnfetched());

    expect(screen.queryByText('生理假')).not.toBeInTheDocument();
  });

  it('shows no group content while the group is being fetched', () => {
    renderDetail(toFetching());

    expect(
      screen.queryByText('好工作股份有限公司 － 前端工程師'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('生理假')).not.toBeInTheDocument();
  });
});
