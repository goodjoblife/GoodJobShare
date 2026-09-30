import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import PolicyReviewGroupModal from './index';

const group = {
  groupId: 'group-1',
  company: { name: '好工作股份有限公司' },
  jobTitle: '前端工程師',
  createdAt: '2026-01-02T00:00:00.000Z',
};

describe('PolicyReviewGroupModal', () => {
  it('shows the company and job title of the group', () => {
    render(
      <PolicyReviewGroupModal group={group} isOpen close={() => undefined} />,
    );

    expect(
      screen.getByText('好工作股份有限公司 － 前端工程師'),
    ).toBeInTheDocument();
  });

  it('shows when the group was shared', () => {
    render(
      <PolicyReviewGroupModal group={group} isOpen close={() => undefined} />,
    );

    expect(screen.getByText('分享於 2026.1.2')).toBeInTheDocument();
  });

  it('renders nothing when no group is opened', () => {
    render(
      <PolicyReviewGroupModal
        group={null}
        isOpen={false}
        close={() => undefined}
      />,
    );

    expect(
      screen.queryByText('好工作股份有限公司 － 前端工程師'),
    ).not.toBeInTheDocument();
  });
});
