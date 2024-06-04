import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';

const usePagination = () => {
  const location = useLocation();
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );
  const getPageLink = useCallback(
    p => qs.stringify({ ...query, p }, { addQueryPrefix: true }),
    [query],
  );
  return [Number(query.p || 1), getPageLink];
};

export default usePagination;
