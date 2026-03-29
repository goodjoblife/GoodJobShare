import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import { subMonths, subYears } from 'date-fns';
import qs from 'qs';

import { useQuery } from 'hooks/routing';
import styles from './SalaryFilter.module.css';

const DATA_TIME_OPTIONS = [
  { value: 'past_month', label: '過去一個月' },
  { value: 'past_year', label: '過去一年' },
  { value: 'past_two_years', label: '過去兩年' },
];

const EXPERIENCE_OPTIONS = [
  { value: '0_3', label: '0~3 年' },
  { value: '4_7', label: '4~7 年' },
  { value: '8_plus', label: '8 年以上' },
];

const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: '其他' },
];

const SORT_OPTIONS = [
  { value: 'EARLIEST_FIRST', label: '參考時間（舊→新）' },
  { value: 'HIGH_HOUR_SALARY_FIRST', label: '估計時薪（高→低）' },
  { value: 'LOW_HOUR_SALARY_FIRST', label: '估計時薪（低→高）' },
  { value: 'HIGH_WEEK_HOUR_FIRST', label: '一週總工時（高→低）' },
  { value: 'LOW_WEEK_HOUR_FIRST', label: '一週總工時（低→高）' },
];

export const salaryFilterFromQuerySelector = query => ({
  dataTime: query.data_time || null,
  experience: query.experience || null,
  gender: query.gender || null,
  sortBy: query.sort_by || null,
});

export const getDataTimeRange = (dataTime, now = new Date()) => {
  if (!dataTime) return undefined;
  const end = { year: now.getFullYear(), month: now.getMonth() + 1 };
  switch (dataTime) {
    case 'past_month': {
      const d = subMonths(now, 1);
      return { start: { year: d.getFullYear(), month: d.getMonth() + 1 }, end };
    }
    case 'past_year': {
      const d = subYears(now, 1);
      return { start: { year: d.getFullYear(), month: d.getMonth() + 1 }, end };
    }
    case 'past_two_years': {
      const d = subYears(now, 2);
      return { start: { year: d.getFullYear(), month: d.getMonth() + 1 }, end };
    }
    default:
      return undefined;
  }
};

export const getExperienceInYearRange = experience => {
  switch (experience) {
    case '0_3':
      return { start: 0, end: 3 };
    case '4_7':
      return { start: 4, end: 7 };
    case '8_plus':
      return { start: 8, end: 100 };
    default:
      return undefined;
  }
};

const useUpdateQuery = () => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  return useCallback(
    updates => {
      const { p, ...restQuery } = query;
      const nextQuery = { ...restQuery, ...updates };
      Object.keys(nextQuery).forEach(key => {
        if (nextQuery[key] == null || nextQuery[key] === '') {
          delete nextQuery[key];
        }
      });
      history.push({
        pathname: location.pathname,
        search: qs.stringify(nextQuery, { addQueryPrefix: true }),
        state: { y: window.scrollY },
      });
    },
    [query, history, location],
  );
};

export const useDataTimeFromQuery = () => {
  const query = useQuery();
  const updateQuery = useUpdateQuery();
  return [
    query.data_time || null,
    val => updateQuery({ data_time: val || undefined }),
  ];
};

export const useExperienceFromQuery = () => {
  const query = useQuery();
  const updateQuery = useUpdateQuery();
  return [
    query.experience || null,
    val => updateQuery({ experience: val || undefined }),
  ];
};

export const useGenderFromQuery = () => {
  const query = useQuery();
  const updateQuery = useUpdateQuery();
  return [
    query.gender || null,
    val => updateQuery({ gender: val || undefined }),
  ];
};

export const useSortByFromQuery = () => {
  const query = useQuery();
  const updateQuery = useUpdateQuery();
  return [
    query.sort_by || null,
    val => updateQuery({ sort_by: val || undefined }),
  ];
};

const SalaryFilterSelect = ({ options, defaultLabel, value, onChange }) => (
  <select
    className={styles.select}
    value={value ?? ''}
    onChange={e => onChange(e.target.value || null)}
  >
    <option value="">{defaultLabel}</option>
    {options.map(o => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

SalaryFilterSelect.propTypes = {
  defaultLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string,
};

const SalaryFilter = () => {
  const [dataTime, setDataTime] = useDataTimeFromQuery();
  const [experience, setExperience] = useExperienceFromQuery();
  const [gender, setGender] = useGenderFromQuery();
  const [sortBy, setSortBy] = useSortByFromQuery();

  return (
    <div className={styles.filterBar}>
      <div className={styles.group}>
        <span className={styles.label}>篩選：</span>
        <SalaryFilterSelect
          options={DATA_TIME_OPTIONS}
          defaultLabel="所有參考時間"
          value={dataTime}
          onChange={setDataTime}
        />
        <SalaryFilterSelect
          options={EXPERIENCE_OPTIONS}
          defaultLabel="所有工作經歷"
          value={experience}
          onChange={setExperience}
        />
        <SalaryFilterSelect
          options={GENDER_OPTIONS}
          defaultLabel="所有性別"
          value={gender}
          onChange={setGender}
        />
      </div>

      <div className={styles.sortGroup}>
        <span className={styles.label}>排序：</span>
        <SalaryFilterSelect
          options={SORT_OPTIONS}
          defaultLabel="參考時間（新→舊）"
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
    </div>
  );
};

export default SalaryFilter;
