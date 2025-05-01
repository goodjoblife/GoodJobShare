import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useQuery } from 'hooks/routing';
import qs from 'qs';

import styles from './Sorter.module.css';
import Caret from 'common/icons/Caret';
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

const options = [
  { label: '近期精選貼文', value: SORT_BY.FEATURED_FIRST },
  { label: '按照時間排序(新->舊)', value: SORT_BY.LATEST_FIRST },
];

const Select = ({ value, onChange }) => {
  const handleChange = useCallback(
    e => {
      onChange(e.target.value);
    },
    [onChange],
  );
  return (
    <div className={styles.sorter}>
      <Sort className={styles.leadingIcon} />
      <select onChange={handleChange} value={value}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <Caret className={styles.caret} />
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const Sorter = () => {
  const [sortBy, setSortBy] = useSortByFromQuery();
  return <Select value={sortBy} onChange={setSortBy} />;
};

export default Sorter;
