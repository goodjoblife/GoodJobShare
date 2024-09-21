import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myPublishIdsSelector } from 'selectors/me';
import { queryMyPublishIdsIfNeeded } from 'actions/me';
import { isFetched } from 'utils/fetchBox';

const useIsMyPublishId = () => {
  const myPublishIdsBox = useSelector(myPublishIdsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMyPublishIdsIfNeeded());
  }, [dispatch, myPublishIdsBox]);

  const useIsMyPublishId = useCallback(
    publishId => {
      if (!isFetched(myPublishIdsBox)) {
        return false;
      }

      const myPublishIds = myPublishIdsBox.data;
      return myPublishIds.includes(publishId);
    },
    [myPublishIdsBox],
  );

  return useIsMyPublishId;
};

export default useIsMyPublishId;
