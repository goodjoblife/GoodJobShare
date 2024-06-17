import { useCallback } from 'react';
import qs from 'qs';
import { useQuery } from 'hooks/routing';
import { usePage } from 'hooks/routing/page';

const usePagination = () => {
  const query = useQuery();
  const page = usePage();
  const getPageLink = useCallback(
    p => qs.stringify({ ...query, p }, { addQueryPrefix: true }),
    [query],
  );
  return [page, getPageLink];
};

export default usePagination;
