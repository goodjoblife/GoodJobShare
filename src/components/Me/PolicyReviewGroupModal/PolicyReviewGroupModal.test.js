import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { getFetched, getUnfetched, toFetching } from 'utils/fetchBox';

import PolicyReviewGroupModal from './index';

const group = {
  groupId: 'group-1',
  company: { name: '好工作股份有限公司' },
  jobTitle: '前端工程師',
  sector: '台北總部',
  createdAt: '2026-01-02T00:00:00.000Z',
  policyReviews: [
    {
      policy: 'MENSTRUAL_LEAVE',
      hasPolicy: 'yes',
      compliance: 'yes',
      remoteWorkPolicy: null,
      review: '每月一天，跟主管口頭說一聲就可以請，不用附證明。',
    },
    {
      policy: 'FAMILY_CARE_LEAVE',
      hasPolicy: 'unknown',
      compliance: null,
      remoteWorkPolicy: null,
      review: null,
    },
    {
      policy: 'REMOTE_WORK',
      hasPolicy: 'yes',
      compliance: null,
      remoteWorkPolicy: 'TWO_DAYS_PER_WEEK',
      review: null,
    },
  ],
};

const renderModal = (box = getFetched(group)) =>
  render(<PolicyReviewGroupModal box={box} isOpen close={() => undefined} />);

describe('PolicyReviewGroupModal', () => {
  it('shows the company and job title of the group', () => {
    renderModal();

    expect(
      screen.getByText('好工作股份有限公司 － 前端工程師'),
    ).toBeInTheDocument();
  });

  it('shows the sector and when the group was shared', () => {
    renderModal();

    expect(screen.getByText('台北總部・分享於 2026.1.2')).toBeInTheDocument();
  });

  it('shows only the date when the group has no sector', () => {
    renderModal(getFetched({ ...group, sector: null }));

    expect(screen.getByText('分享於 2026.1.2')).toBeInTheDocument();
  });

  it('lists every policy review in the group', () => {
    renderModal();

    expect(screen.getByText('生理假')).toBeInTheDocument();
    expect(screen.getByText('家庭照顧假')).toBeInTheDocument();
    expect(screen.getByText('遠端工作')).toBeInTheDocument();
  });

  it('joins the answer with its compliance', () => {
    renderModal();

    expect(screen.getByText('有・符合性別平等工作法')).toBeInTheDocument();
    expect(
      screen.getByText('每月一天，跟主管口頭說一聲就可以請，不用附證明。'),
    ).toBeInTheDocument();
  });

  it('joins the answer with its remote work policy', () => {
    renderModal();

    expect(screen.getByText('有・每週兩天')).toBeInTheDocument();
  });

  it('shows the answer alone when the policy was answered unknown', () => {
    renderModal();

    expect(screen.getByText('不知道')).toBeInTheDocument();
  });

  it('shows nothing before the group has been fetched', () => {
    renderModal(getUnfetched());

    expect(screen.queryByText('生理假')).not.toBeInTheDocument();
  });

  it('shows no group content while the group is being fetched', () => {
    renderModal(toFetching());

    expect(
      screen.queryByText('好工作股份有限公司 － 前端工程師'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('生理假')).not.toBeInTheDocument();
  });
});
