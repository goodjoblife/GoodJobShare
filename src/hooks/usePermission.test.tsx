import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import usePermission from './usePermission';
import PermissionContextProvider from 'components/common/PermissionContextProvider';
import { queryHasSearchPermissionApi } from 'apis/me';
import useIsMyPublishId from './useIsMyPublishId';

jest.mock('apis/me', () => ({ queryHasSearchPermissionApi: jest.fn() }));
jest.mock('hooks/auth', () => ({ useToken: jest.fn(() => 'test-token') }));
jest.mock('./useIsMyPublishId');

const mockQueryHasSearchPermissionApi = queryHasSearchPermissionApi as jest.MockedFunction<
  typeof queryHasSearchPermissionApi
>;
const mockUseIsMyPublishId = useIsMyPublishId as jest.Mock;

const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <PermissionContextProvider>{children}</PermissionContextProvider>
);

describe('usePermission', () => {
  beforeEach(() => {
    localStorage.clear();
    mockUseIsMyPublishId.mockReturnValue(() => false);
  });

  describe('fetchPermission', () => {
    it('第一次造訪時給予 canView = true，並寫入 localStorage', async () => {
      mockQueryHasSearchPermissionApi.mockResolvedValue(false);

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      expect(localStorage.getItem('visitedWebsite')).toBe('true');
      const [permissionFetched, , canViewPublishId] = result.current;
      expect(permissionFetched).toBe(true);
      expect(canViewPublishId('any-id')).toBe(true);
    });

    it('再次造訪時依 API 結果給予 canView = true', async () => {
      localStorage.setItem('visitedWebsite', 'true');
      mockQueryHasSearchPermissionApi.mockResolvedValue(true);

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      const [permissionFetched, , canViewPublishId] = result.current;
      expect(permissionFetched).toBe(true);
      expect(canViewPublishId('any-id')).toBe(true);
    });

    it('再次造訪時依 API 結果給予 canView = false', async () => {
      localStorage.setItem('visitedWebsite', 'true');
      mockQueryHasSearchPermissionApi.mockResolvedValue(false);

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      const [permissionFetched, , canViewPublishId] = result.current;
      expect(permissionFetched).toBe(true);
      expect(canViewPublishId('any-id')).toBe(false);
    });
  });

  describe('canViewPublishId', () => {
    it('自己的 publishId 無論 canView 為何皆回傳 true', async () => {
      localStorage.setItem('visitedWebsite', 'true');
      mockQueryHasSearchPermissionApi.mockResolvedValue(false);
      mockUseIsMyPublishId.mockReturnValue((id: string) => id === 'my-id');

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      const [, , canViewPublishId] = result.current;
      expect(canViewPublishId('my-id')).toBe(true);
      expect(canViewPublishId('other-id')).toBe(false);
    });
  });
});
