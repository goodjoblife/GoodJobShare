import { useContext, useCallback } from 'react';
import PermissionContext from 'common/permission-context/PermissionContext';
import { useToken } from 'hooks/auth';
import api from '../apis';

export default () => {
  const token = useToken();
  const { canView, permissionFetched, setPermissionState } = useContext(
    PermissionContext,
  );
  const fetchPermission = useCallback(async () => {
    const result = await api.me.getHasSearchPermission({ token });
    const { hasSearchPermission: hasPermission } = result;

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
  }, [setPermissionState, token]);
  return [permissionFetched, fetchPermission, canView];
};
