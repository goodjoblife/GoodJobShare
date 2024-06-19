import { useMemo } from 'react';
import { pageFromQuerySelector } from 'selectors/routing/page';
import { useQuery } from 'hooks/routing';

export const usePage = () => {
  // page from ?p=xxx
  const query = useQuery();
  return useMemo(() => pageFromQuerySelector(query), [query]);
};
