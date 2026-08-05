import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import useJobTitleParam, { jobTitleSelector } from './useJobTitleParam';

// 掛在哪個 route 之下決定 useParams 拿不拿得到 jobTitle，
// 因此連 route path 一起模擬，而不是 mock useParams
// @types/react-router-dom 自帶一份舊的 @types/react，Route 的 render 因此
// 收不下本專案的 ReactElement。全 repo 沒有其他 .tsx 渲染過 Route，
// 這個 cast 只為了在測試裡拿到真正的 route match
const RouteWithChildren = (Route as unknown) as React.FC<{
  path: string;
  children: React.ReactNode;
}>;

const wrapperAt = (
  path: string,
  entry: string,
): React.FC<React.PropsWithChildren> => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <MemoryRouter initialEntries={[entry]}>
      <RouteWithChildren path={path}>{children}</RouteWithChildren>
    </MemoryRouter>
  );
  return Wrapper;
};

describe('jobTitleSelector', () => {
  it('decodes the param', () => {
    expect(jobTitleSelector({ jobTitle: '軟體%20工程師' })).toBe('軟體 工程師');
  });

  it('throws instead of returning the string "undefined" when the param is absent', () => {
    expect(() => jobTitleSelector({})).toThrow('jobTitle 不存在');
  });
});

describe('useJobTitleParam', () => {
  it('decodes the param under /job-titles/:jobTitle', () => {
    const { result } = renderHook(() => useJobTitleParam(), {
      wrapper: wrapperAt('/job-titles/:jobTitle', '/job-titles/軟體%20工程師'),
    });

    expect(result.current).toBe('軟體 工程師');
  });

  it('throws when mounted outside /job-titles/:jobTitle', () => {
    const { result } = renderHook(() => useJobTitleParam(), {
      wrapper: wrapperAt('/companies/:companyName', '/companies/Foo'),
    });

    expect(result.error).toEqual(
      expect.objectContaining({
        message: expect.stringContaining('jobTitle 不存在'),
      }),
    );
  });
});
