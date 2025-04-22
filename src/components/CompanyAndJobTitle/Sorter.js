import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from 'hooks/routing';
import qs from 'qs';

import Select from 'common/form/Select';

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

const options = [
  { label: '近期精選貼文', value: SORT_BY.FEATURED_FIRST },
  { label: '按照時間排序(新->舊)', value: SORT_BY.LATEST_FIRST },
];

const Sorter = () => {
  const [sortBy, setSortBy] = useSortByFromQuery();
  const handleChange = useCallback(
    e => {
      setSortBy(e.target.value);
    },
    [setSortBy],
  );
  return (
    <Select
      options={options}
      hasNullOption={false}
      value={sortBy}
      onChange={handleChange}
    />
  );
};

export default Sorter;
