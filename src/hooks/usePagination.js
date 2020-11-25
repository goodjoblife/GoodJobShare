import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';

// 從 query string 取得 page number，以及把 query string 加上 page number 的邏輯
const usePagination = () => {
  const { search } = useLocation();
  const query = useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [
    search,
  ]);
  const getPageLink = useCallback(
    page => qs.stringify({ ...query, p: page }, { addQueryPrefix: true }),
    [query],
  );
  return [Number(query.p || 1), getPageLink];
};

export default usePagination;
