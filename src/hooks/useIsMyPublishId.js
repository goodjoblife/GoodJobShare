import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myPublishIdsSelector } from 'selectors/me';
import { queryMyPublishIdsIfNeeded } from 'actions/me';
import { isFetched } from 'utils/fetchBox';
import { useLogin } from './login';

const useIsMyPublishId = () => {
  const [isLoggedIn] = useLogin();
  const myPublishIdsBox = useSelector(myPublishIdsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMyPublishIdsIfNeeded());
  }, [dispatch, isLoggedIn]);

  const isMyPublishId = useCallback(
    publishId => {
      if (!isFetched(myPublishIdsBox)) {
        return false;
      }

      const myPublishIds = myPublishIdsBox.data;
      return myPublishIds.includes(publishId);
    },
    [myPublishIdsBox],
  );

  return isMyPublishId;
};

export default useIsMyPublishId;
