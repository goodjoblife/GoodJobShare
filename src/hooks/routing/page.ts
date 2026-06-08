import { useMemo } from 'react';
import { pageFromQuerySelector } from 'selectors/routing';
import { useQuery } from 'hooks/routing';

export const usePage = (): number => {
  // page from ?p=xxx
  const query = useQuery();
  return useMemo(() => pageFromQuerySelector(query), [query]);
};
