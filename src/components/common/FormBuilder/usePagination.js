import { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

const usePagination = () => {
  const location = useLocation();
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location],
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

export default usePagination;
