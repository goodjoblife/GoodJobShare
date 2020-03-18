import { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

export const usePagination = () => {
  const location = useLocation();
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );
  const page = parseInt(query.p, 10) || 0;

  const history = useHistory();
  const setPage = useCallback(
    index => {
      history.push({
        search: qs.stringify({ ...query, p: index }, { addQueryPrefix: true }),
      });
    },
    [history, query],
  );

  return [page, setPage];
};
