import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from 'hooks/routing';
import qs from 'qs';

import RoundedSelect from 'common/RoundedSelect';
import Sort from 'common/icons/Sort';

export const SORT_BY = {
  LATEST_FIRST: 'LATEST_FIRST',
  FEATURED_FIRST: 'FEATURED_FIRST',
};

export const sortByFromQuerySelector = query => {
  const sortBy = query.sort_by;
  const availableSortBy = Object.values(SORT_BY);
  if (availableSortBy.includes(sortBy)) return sortBy;
  return SORT_BY.FEATURED_FIRST;
};

export const useSortByFromQuery = () => {
  const history = useHistory();
  const query = useQuery();
  const sortBy = sortByFromQuerySelector(query);
  const setSortBy = useCallback(
    nextSortBy => {
      if (sortBy === nextSortBy) return;
      const { p, sort_by, ...restQuery } = query; // remove page when sort_by changes
      const nextQuery = { ...restQuery, sort_by: nextSortBy };
      const nextUrl = qs.stringify(nextQuery, { addQueryPrefix: true });
      history.push(nextUrl);
    },
    [sortBy, query, history],
  );
  return [sortBy, setSortBy];
};

const Sorter = () => {
  const [sortBy, setSortBy] = useSortByFromQuery();
  return (
    <RoundedSelect Icon={Sort} value={sortBy} onChange={setSortBy}>
      <option value={SORT_BY.FEATURED_FIRST}>近期精選貼文</option>
      <option value={SORT_BY.LATEST_FIRST}>按照時間排序(新-&gt;舊)</option>
    </RoundedSelect>
  );
};

export default Sorter;
