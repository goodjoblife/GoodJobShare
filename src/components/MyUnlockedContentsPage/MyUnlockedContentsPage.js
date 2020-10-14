import React, { useEffect } from 'react';
import usePagination from 'hooks/usePagination';
import { useFetchMyUnlockedContents } from './useQuery';

const MyUnlockedContentsPage = () => {
  const [
    myUnlockedContents,
    fetchMyUnlockedContents,
  ] = useFetchMyUnlockedContents();
  // eslint-disable-next-line no-unused-vars
  const [page, getPageLink] = usePagination();

  useEffect(() => {
    fetchMyUnlockedContents();
  }, [fetchMyUnlockedContents]);

  return (
    <div>
      page: {page} data: {JSON.stringify(myUnlockedContents)}
    </div>
  );
};

export default MyUnlockedContentsPage;
