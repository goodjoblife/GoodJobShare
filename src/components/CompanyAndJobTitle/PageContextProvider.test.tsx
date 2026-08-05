import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { PageType, TabType } from 'constants/companyJobTitle';

import {
  PageContextProvider,
  useCompanyName,
  usePageContext,
} from './PageContextProvider';

const wrapperFor = (
  pageType: PageType,
  pageName: string,
): React.FC<React.PropsWithChildren> => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <PageContextProvider
      pageType={pageType}
      pageName={pageName}
      tabType={TabType.OVERVIEW}
    >
      {children}
    </PageContextProvider>
  );
  return Wrapper;
};

describe('usePageContext', () => {
  it('returns the page identity provided by PageContextProvider', () => {
    const { result } = renderHook(() => usePageContext(), {
      wrapper: wrapperFor(PageType.COMPANY, 'Foo'),
    });

    expect(result.current).toEqual({
      pageType: PageType.COMPANY,
      pageName: 'Foo',
      tabType: TabType.OVERVIEW,
    });
  });

  it('throws when used outside the provider', () => {
    const { result } = renderHook(() => usePageContext());

    expect(result.error).toEqual(
      expect.objectContaining({
        message: expect.stringContaining('usePageContext 只能用在'),
      }),
    );
  });
});

describe('useCompanyName', () => {
  it('returns pageName on a company page', () => {
    const { result } = renderHook(() => useCompanyName(), {
      wrapper: wrapperFor(PageType.COMPANY, 'Foo'),
    });

    expect(result.current).toBe('Foo');
  });

  // 這是 #1769 的重點：職稱頁的 pageName 是職稱，拿去當公司名會靜靜查無資料
  it('throws on a job title page instead of handing back the job title', () => {
    const { result } = renderHook(() => useCompanyName(), {
      wrapper: wrapperFor(PageType.JOB_TITLE, 'Engineer'),
    });

    expect(result.error).toEqual(
      expect.objectContaining({
        message: expect.stringContaining('useCompanyName 只能用在公司頁'),
      }),
    );
  });
});
