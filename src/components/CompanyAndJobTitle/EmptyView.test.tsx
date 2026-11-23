import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import { PageType, TabType } from 'constants/companyJobTitle';

import EmptyView from './EmptyView';
import { PageContextProvider } from './PageContextProvider';

// 分享按鈕的預填值放在 location state 裡，DOM 上看不到，因此把它印出來
const LocationState: React.FC = () => (
  <div data-testid="location-state">
    {JSON.stringify(useLocation().state || null)}
  </div>
);

const renderEmptyView = ({
  pageType,
  pageName,
  tabType,
}: {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
}): void => {
  render(
    <MemoryRouter>
      <PageContextProvider
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
      >
        <EmptyView pageName={pageName} tabType={tabType} />
      </PageContextProvider>
      <LocationState />
    </MemoryRouter>,
  );
};

describe('EmptyView 的分享按鈕', () => {
  it('在公司頁預填公司名稱', () => {
    renderEmptyView({
      pageType: PageType.COMPANY,
      pageName: '沒薪水資料公司',
      tabType: TabType.INTERVIEW_EXPERIENCE,
    });

    fireEvent.click(screen.getByText('分享你的面試經驗'));

    expect(screen.getByTestId('location-state')).toHaveTextContent(
      JSON.stringify({ share: 'interview', companyName: '沒薪水資料公司' }),
    );
  });

  it('在職稱頁預填職稱', () => {
    renderEmptyView({
      pageType: PageType.JOB_TITLE,
      pageName: '軟體工程師',
      tabType: TabType.TIME_AND_SALARY,
    });

    fireEvent.click(screen.getByText('分享你的薪水&加班狀況'));

    expect(screen.getByTestId('location-state')).toHaveTextContent(
      JSON.stringify({
        share: 'salary-work-times',
        jobTitle: '軟體工程師',
      }),
    );
  });

  it('總覽沒有對應的表單，不顯示按鈕', () => {
    renderEmptyView({
      pageType: PageType.COMPANY,
      pageName: '沒薪水資料公司',
      tabType: TabType.OVERVIEW,
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
