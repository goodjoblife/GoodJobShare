import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { subMonths, subYears } from 'date-fns';
import qs from 'qs';

import { useQuery } from 'hooks/routing';
import {
  DATA_TIME,
  DATA_TIME_OPTIONS,
  EXPERIENCE,
  EXPERIENCE_OPTIONS,
  SORT_OPTIONS,
  DataTime,
  Experience,
} from 'constants/salaryFilter';
import { GENDER_OPTIONS } from 'constants/gender';
import {
  TQueryParams,
  dataTimeFromQuerySelector,
  experienceFromQuerySelector,
  genderFromQuerySelector,
  sortByFromQuerySelector,
} from 'selectors/salaryFilter';
import styles from './SalaryFilter.module.css';

export {
  salaryFilterFromQuerySelector,
  dataTimeFromQuerySelector,
  experienceFromQuerySelector,
  genderFromQuerySelector,
  sortByFromQuerySelector,
} from 'selectors/salaryFilter';

type TScrollY = number | null;

type TSalaryFilterSelectProps = {
  options: { value: string; label: string }[];
  defaultLabel: string;
  value: string | null;
  onChange: (value: string | null) => void;
};

type TSalaryFilterProps = {
  y?: TScrollY;
};

const createYearMonth = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

export const getDataTimeRange = (
  dataTime: DataTime | null | undefined,
  now = new Date(),
) => {
  if (!dataTime) return undefined;
  const end = createYearMonth(now);
  switch (dataTime) {
    case DATA_TIME.PAST_MONTH:
      return { start: createYearMonth(subMonths(now, 1)), end };
    case DATA_TIME.PAST_YEAR:
      return { start: createYearMonth(subYears(now, 1)), end };
    case DATA_TIME.PAST_TWO_YEARS:
      return { start: createYearMonth(subYears(now, 2)), end };
    default:
      return undefined;
  }
};

export const getExperienceInYearRange = (
  experience: Experience | null | undefined,
) => {
  switch (experience) {
    case EXPERIENCE.ZERO_THREE:
      return { start: 0, end: 3 };
    case EXPERIENCE.FOUR_SEVEN:
      return { start: 4, end: 7 };
    case EXPERIENCE.EIGHT_PLUS:
      return { start: 8, end: 100 };
    default:
      return undefined;
  }
};

const useUpdateQuery = (key: string, y: TScrollY = null) => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  return useCallback(
    (value: string | null) => {
      const { p, ...restQuery } = query as Record<string, string>;
      const nextQuery: Record<string, string> = { ...restQuery };
      if (value) {
        nextQuery[key] = value;
      } else {
        delete nextQuery[key];
      }
      history.push({
        pathname: location.pathname,
        search: qs.stringify(nextQuery, { addQueryPrefix: true }),
        state: { y },
      });
    },
    [key, y, query, history, location],
  );
};

export const useDataTimeFromQuery = (y: TScrollY = null) => {
  const query = useQuery() as TQueryParams;
  const setDataTime = useUpdateQuery('data_time', y);
  return [dataTimeFromQuerySelector(query), setDataTime] as const;
};

export const useExperienceFromQuery = (y: TScrollY = null) => {
  const query = useQuery() as TQueryParams;
  const setExperience = useUpdateQuery('experience', y);
  return [experienceFromQuerySelector(query), setExperience] as const;
};

export const useGenderFromQuery = (y: TScrollY = null) => {
  const query = useQuery() as TQueryParams;
  const setGender = useUpdateQuery('gender', y);
  return [genderFromQuerySelector(query), setGender] as const;
};

export const useSortByFromQuery = (y: TScrollY = null) => {
  const query = useQuery() as TQueryParams;
  const setSortBy = useUpdateQuery('sort_by', y);
  return [sortByFromQuerySelector(query), setSortBy] as const;
};

const SalaryFilterSelect = ({
  options,
  defaultLabel,
  value,
  onChange,
}: TSalaryFilterSelectProps) => (
  <select
    className={styles.select}
    value={value || ''}
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

const SalaryFilter = ({ y = null }: TSalaryFilterProps) => {
  const [dataTime, setDataTime] = useDataTimeFromQuery(y);
  const [experience, setExperience] = useExperienceFromQuery(y);
  const [gender, setGender] = useGenderFromQuery(y);
  const [sortBy, setSortBy] = useSortByFromQuery(y);

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
