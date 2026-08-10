import { useMemo } from 'react';

import { useQuery } from 'hooks/routing';
import { pageFromQuerySelector } from 'selectors/routing';

export const usePage = (): number => {
  // page from ?p=xxx
  const query = useQuery();
  return useMemo(() => pageFromQuerySelector(query), [query]);
};
