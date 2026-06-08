import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import qs, { ParsedQs } from 'qs';

export const useSearch = (): string => {
  const location = useLocation();
  return location.search;
};

export const useQuery = (): ParsedQs => {
  const search = useSearch();
  return useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search]);
};
