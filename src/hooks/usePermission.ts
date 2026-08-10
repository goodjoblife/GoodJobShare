import { useCallback, useContext } from 'react';
import { useLocalStorage } from 'react-use';

import queryPermission from 'apis/queryPermission';
import PermissionContext from 'contexts/PermissionContext';
import { useToken } from 'hooks/auth';

import useIsMyPublishId from './useIsMyPublishId';

const useGetSearchPermission = ({
  token,
}: {
  token: string | undefined;
}): (() => Promise<boolean>) => {
  return useCallback(async (): Promise<boolean> => {
    if (!token) return false;
    return await queryPermission({ token });
  }, [token]);
};

const usePermission = (): [
  boolean,
  () => Promise<void>,
  (publishId: string) => boolean,
] => {
  const token = useToken();
  const { canView, permissionFetched, setPermissionState } = useContext(
    PermissionContext,
  );
  const getSearchPermission = useGetSearchPermission({ token });
  const [visitedWebsite, setVisitedWebsite] = useLocalStorage<string>(
    'visitedWebsite',
    undefined,
    true,
  );

  const fetchPermission = useCallback(async (): Promise<void> => {
    const hasPermission = await getSearchPermission();

    if (visitedWebsite === undefined) {
      // 該裝置第一次進到我們網站，那就給權限
      setVisitedWebsite('true');
      setPermissionState({ canView: true, permissionFetched: true });
    } else {
      // 該裝置第二次以上進到我們網站，那就根據 api 結果設定權限
      setPermissionState({
        canView: hasPermission,
        permissionFetched: true,
      });
    }
  }, [
    getSearchPermission,
    setPermissionState,
    visitedWebsite,
    setVisitedWebsite,
  ]);

  const isMyPublishId = useIsMyPublishId();

  const canViewPublishId = useCallback(
    (publishId: string) => isMyPublishId(publishId) || canView,
    [canView, isMyPublishId],
  );

  return [permissionFetched, fetchPermission, canViewPublishId];
};

export default usePermission;
