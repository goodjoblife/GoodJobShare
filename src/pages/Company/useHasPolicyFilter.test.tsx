import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import { HasPolicy } from 'apis/queryCompanyPolicyReviews';

import useHasPolicyFilter from './useHasPolicyFilter';

// 同 useCompanyNameParam.test.tsx：@types/react-router-dom 自帶一份舊的
// @types/react，MemoryRouter 的 children 因此收不下本專案的 ReactNode
const RouterWithChildren = (MemoryRouter as unknown) as React.FC<{
  initialEntries: string[];
  children: React.ReactNode;
}>;

const wrapperAt = (entry: string): React.FC<React.PropsWithChildren> => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <RouterWithChildren initialEntries={[entry]}>{children}</RouterWithChildren>
  );
  return Wrapper;
};

const renderFilterAt = (
  entry: string,
): {
  current: {
    selectedHasPolicy: HasPolicy[];
    toggleHasPolicy: (value: HasPolicy, y: number | null) => void;
    search: string;
    state: { y: number | null } | undefined;
  };
} => {
  const { result } = renderHook(
    () => {
      const [selectedHasPolicy, toggleHasPolicy] = useHasPolicyFilter();
      const location = useLocation<{ y: number | null } | undefined>();
      return {
        selectedHasPolicy,
        toggleHasPolicy,
        search: location.search,
        state: location.state,
      };
    },
    { wrapper: wrapperAt(entry) },
  );
  return result;
};

describe('useHasPolicyFilter', () => {
  it('沒帶 param 時是全選', () => {
    expect(renderFilterAt('/').current.selectedHasPolicy).toEqual([
      'yes',
      'no',
      'unknown',
    ]);
  });

  it('取消一個答案時把剩下的寫進網址', () => {
    const result = renderFilterAt('/');
    act(() => result.current.toggleHasPolicy('no', null));
    expect(result.current.selectedHasPolicy).toEqual(['yes', 'unknown']);
    expect(result.current.search).toBe('?hasPolicy=yes%2Cunknown');
  });

  it('全部選回來時把 param 移掉，而不是留下三個值', () => {
    const result = renderFilterAt('/?hasPolicy=yes%2Cunknown');
    act(() => result.current.toggleHasPolicy('no', null));
    expect(result.current.selectedHasPolicy).toEqual(['yes', 'no', 'unknown']);
    expect(result.current.search).toBe('');
  });

  it('全部取消時留下空字串，不會變成沒帶 param', () => {
    const result = renderFilterAt('/?hasPolicy=yes');
    act(() => result.current.toggleHasPolicy('yes', null));
    expect(result.current.selectedHasPolicy).toEqual([]);
    expect(result.current.search).toBe('?hasPolicy=');
  });

  it('網址順序固定，不隨點選順序改變', () => {
    const result = renderFilterAt('/?hasPolicy=unknown');
    act(() => result.current.toggleHasPolicy('yes', null));
    expect(result.current.search).toBe('?hasPolicy=yes%2Cunknown');
  });

  it('切換篩選時把頁數移掉，因為後端是對篩選後的列表分頁', () => {
    const result = renderFilterAt('/?p=3');
    act(() => result.current.toggleHasPolicy('no', null));
    expect(result.current.search).toBe('?hasPolicy=yes%2Cunknown');
  });

  it('把篩選區塊的位置放進 location state，讓畫面不會跳回頁首', () => {
    const result = renderFilterAt('/');
    act(() => result.current.toggleHasPolicy('no', 420));
    expect(result.current.state).toEqual({ y: 420 });
  });

  it('保留其他無關的 query param', () => {
    const result = renderFilterAt('/?utm_source=fb&p=2');
    act(() => result.current.toggleHasPolicy('no', null));
    expect(result.current.search).toBe(
      '?utm_source=fb&hasPolicy=yes%2Cunknown',
    );
  });
});
