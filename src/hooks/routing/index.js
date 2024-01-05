import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

export const useSearch = () => {
  const location = useLocation();
  return location.search;
};

export const useQuery = () => {
  const search = useSearch();
  return useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search]);
};
