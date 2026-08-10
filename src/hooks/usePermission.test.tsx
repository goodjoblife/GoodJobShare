import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import queryPermission from 'apis/queryPermission';
import PermissionContextProvider from 'components/common/PermissionContextProvider';

import useIsMyPublishId from './useIsMyPublishId';
import usePermission from './usePermission';

jest.mock('apis/queryPermission');
jest.mock('hooks/auth', () => ({ useToken: jest.fn(() => 'test-token') }));
jest.mock('./useIsMyPublishId');

const mockQueryPermission = queryPermission as jest.MockedFunction<
  typeof queryPermission
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
    it('sets canView = true and writes to localStorage on first visit', async () => {
      mockQueryPermission.mockResolvedValue(false);

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      expect(localStorage.getItem('visitedWebsite')).toBe('true');
      const [permissionFetched, , canViewPublishId] = result.current;
      expect(permissionFetched).toBe(true);
      expect(canViewPublishId('any-id')).toBe(true);
    });

    it('sets canView = true based on API result on subsequent visits', async () => {
      localStorage.setItem('visitedWebsite', 'true');
      mockQueryPermission.mockResolvedValue(true);

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      const [permissionFetched, , canViewPublishId] = result.current;
      expect(permissionFetched).toBe(true);
      expect(canViewPublishId('any-id')).toBe(true);
    });

    it('sets canView = false based on API result on subsequent visits', async () => {
      localStorage.setItem('visitedWebsite', 'true');
      mockQueryPermission.mockResolvedValue(false);

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      const [permissionFetched, , canViewPublishId] = result.current;
      expect(permissionFetched).toBe(true);
      expect(canViewPublishId('any-id')).toBe(false);
    });
  });

  describe('canViewPublishId', () => {
    it("returns true for the user's own publishId regardless of canView", async () => {
      localStorage.setItem('visitedWebsite', 'true');
      mockQueryPermission.mockResolvedValue(false);
      mockUseIsMyPublishId.mockReturnValue((id: string) => id === 'my-id');

      const { result } = renderHook(() => usePermission(), { wrapper });
      await act(() => result.current[1]());

      const [, , canViewPublishId] = result.current;
      expect(canViewPublishId('my-id')).toBe(true);
      expect(canViewPublishId('other-id')).toBe(false);
    });
  });
});
