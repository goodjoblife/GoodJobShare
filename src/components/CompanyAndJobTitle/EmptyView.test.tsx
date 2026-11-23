import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import { PageType, TabType } from 'constants/companyJobTitle';

import EmptyView from './EmptyView';
import { PageContextProvider } from './PageContextProvider';

// 分享按鈕的預填值放在 location state 裡，DOM 上看不到，因此把它印出來
const LocationState: React.FC = () => {
  const { pathname, state } = useLocation();
  return (
    <div data-testid="location-state">
      {JSON.stringify({ pathname, state: state || null })}
    </div>
  );
};

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
      JSON.stringify({
        pathname: '/',
        state: { share: 'interview', companyName: '沒薪水資料公司' },
      }),
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
        pathname: '/',
        state: { share: 'salary-work-times', jobTitle: '軟體工程師' },
      }),
    );
  });

  it('總覽沒有單一對應的表單，改帶預填值去 /share 讓使用者自己挑', () => {
    renderEmptyView({
      pageType: PageType.COMPANY,
      pageName: '沒薪水資料公司',
      tabType: TabType.OVERVIEW,
    });

    fireEvent.click(screen.getByText('分享你的職場資訊'));

    expect(screen.getByTestId('location-state')).toHaveTextContent(
      JSON.stringify({
        pathname: '/share',
        state: { companyName: '沒薪水資料公司' },
      }),
    );
  });
});
