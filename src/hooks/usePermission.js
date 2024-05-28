import { useContext, useCallback } from 'react';
import PermissionContext from 'hooks/PermissionContext';
import { useToken } from 'hooks/auth';
import { queryHasSearchPermissionApi } from 'apis/me';

const useGetSearchPermission = ({ token }) => {
  return useCallback(async () => {
    if (token === null) return false;
    // Get permission only when token available
    return await queryHasSearchPermissionApi({ token });
  }, [token]);
};

export default () => {
  const token = useToken();
  const { canView, permissionFetched, setPermissionState } = useContext(
    PermissionContext,
  );
  const getSearchPermission = useGetSearchPermission({ token });
  const fetchPermission = useCallback(async () => {
    const hasPermission = await getSearchPermission();

    if (typeof Storage !== 'undefined') {
      const visitedWebsite = localStorage.getItem('visitedWebsite');

      if (visitedWebsite === null) {
        // 該裝置第一次進到我們網站，那就給權限
        localStorage.setItem('visitedWebsite', true);
        setPermissionState({ canView: true, permissionFetched: true });
      } else {
        // 該裝置第二次以上進到我們網站，那就根據 api 結果設定權限
        setPermissionState({
          canView: hasPermission,
          permissionFetched: true,
        });
      }
    }
  }, [getSearchPermission, setPermissionState]);
  return [permissionFetched, fetchPermission, canView];
};
