import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myPublishIdsSelector } from 'selectors/me';
import { queryMyPublishIdsIfNeeded } from 'actions/me';
import { isFetched } from 'utils/fetchBox';

const useIsMyPublishId = ({ token }) => {
  const myPublishIdsBox = useSelector(myPublishIdsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMyPublishIdsIfNeeded({ token }));
  }, [dispatch, token]);

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
