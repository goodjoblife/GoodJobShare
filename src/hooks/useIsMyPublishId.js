import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myPublishIdsSelector } from 'selectors/me';
import { queryMyPublishIds } from 'actions/me';
import { isError, isFetched, isUnfetched } from 'utils/fetchBox';

const useIsMyPublishId = () => {
  const myPublishIdsBox = useSelector(myPublishIdsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUnfetched(myPublishIdsBox) || isError(myPublishIdsBox)) {
      dispatch(queryMyPublishIds());
    }
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
