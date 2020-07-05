import { useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getHasSearchPermission } from '../apis/me';
import PermissionContext from 'common/permission-context/PermissionContext';
import { tokenSelector } from '../selectors/authSelector';

export default () => {
  const token = useSelector(tokenSelector);
  const { canView, permissionFetched, setPermissionState } = useContext(
    PermissionContext,
  );
  const fetchPermission = useCallback(async () => {
    const result = await getHasSearchPermission({ token });
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
