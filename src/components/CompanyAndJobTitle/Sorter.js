import qs from 'qs';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import Sort from 'common/icons/Sort';
import RoundedSelect from 'common/RoundedSelect';
import { useQuery } from 'hooks/routing';
import useSectionY from 'hooks/useSectionY';

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
  const [y, sectionRef] = useSectionY();
  const setSortBy = useCallback(
    nextSortBy => {
      if (sortBy === nextSortBy) return;
      const { p, sort_by, ...restQuery } = query; // remove page when sort_by changes
      const nextQuery = { ...restQuery, sort_by: nextSortBy };
      const search = qs.stringify(nextQuery, { addQueryPrefix: true });
      history.push({ search, state: { y } });
    },
    [sortBy, query, history, y],
  );
  return [sortBy, setSortBy, sectionRef];
};

const Sorter = () => {
  const [sortBy, setSortBy, sectionRef] = useSortByFromQuery();
  return (
    <div ref={sectionRef}>
      <RoundedSelect Icon={Sort} value={sortBy} onChange={setSortBy}>
        <option value={SORT_BY.FEATURED_FIRST}>近期精選貼文</option>
        <option value={SORT_BY.LATEST_FIRST}>按照時間排序(新-&gt;舊)</option>
      </RoundedSelect>
    </div>
  );
};

export default Sorter;
