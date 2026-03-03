import React from 'react';
import { useHistory } from 'react-router';
import qs from 'qs';

import { useQuery } from 'hooks/routing';
import Select from 'common/form/Select';
import styles from './SalaryFilter.module.css';

// ── URL param values ──────────────────────────────────────────
// data_time : 'past_month' | 'past_year' | 'past_two_years'
// experience: '0_3' | '4_7' | '8_plus'
// gender    : 'male' | 'female' | 'other'
// sort_by   : 'LATEST_FIRST' | 'EARLIEST_FIRST' |
//             'HIGH_HOUR_SALARY_FIRST' | 'LOW_HOUR_SALARY_FIRST' |
//             'HIGH_WEEK_HOUR_FIRST'  | 'LOW_WEEK_HOUR_FIRST'
// ─────────────────────────────────────────────────────────────

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
  { value: 'LATEST_FIRST', label: '參考時間（新→舊）' },
  { value: 'EARLIEST_FIRST', label: '參考時間（舊→新）' },
  { value: 'HIGH_HOUR_SALARY_FIRST', label: '估計時薪（高→低）' },
  { value: 'LOW_HOUR_SALARY_FIRST', label: '估計時薪（低→高）' },
  { value: 'HIGH_WEEK_HOUR_FIRST', label: '一週總工時（高→低）' },
  { value: 'LOW_WEEK_HOUR_FIRST', label: '一週總工時（低→高）' },
];

// ── Pure selector (used by SSR fetchData too) ─────────────────
export const salaryFilterFromQuerySelector = query => ({
  dataTime: query.data_time || null,
  experience: query.experience || null,
  gender: query.gender || null,
  sortBy: query.sort_by || null,
});

// ── Convert URL preset → API DataTimeRange object ─────────────
export const getDataTimeRange = dataTime => {
  if (!dataTime) return undefined;
  const now = new Date();
  const end = { year: now.getFullYear(), month: now.getMonth() + 1 };
  switch (dataTime) {
    case 'past_month': {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 1);
      return { start: { year: d.getFullYear(), month: d.getMonth() + 1 }, end };
    }
    case 'past_year': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return { start: { year: d.getFullYear(), month: d.getMonth() + 1 }, end };
    }
    case 'past_two_years': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 2);
      return { start: { year: d.getFullYear(), month: d.getMonth() + 1 }, end };
    }
    default:
      return undefined;
  }
};

// ── Convert URL preset → API ExperienceInYearRange object ─────
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

// ── Hook ──────────────────────────────────────────────────────
export const useSalaryFilterFromQuery = () => {
  const history = useHistory();
  const query = useQuery();
  const {
    dataTime,
    experience,
    gender,
    sortBy,
  } = salaryFilterFromQuerySelector(query);

  const updateQuery = updates => {
    // eslint-disable-next-line no-unused-vars
    const { p, ...restQuery } = query;
    const nextQuery = { ...restQuery, ...updates };
    Object.keys(nextQuery).forEach(key => {
      if (nextQuery[key] == null || nextQuery[key] === '') {
        delete nextQuery[key];
      }
    });
    history.push(qs.stringify(nextQuery, { addQueryPrefix: true }));
  };

  return {
    dataTime,
    setDataTime: val => updateQuery({ data_time: val || undefined }),
    experience,
    setExperience: val => updateQuery({ experience: val || undefined }),
    gender,
    setGender: val => updateQuery({ gender: val || undefined }),
    sortBy,
    setSortBy: val => updateQuery({ sort_by: val || undefined }),
  };
};

// ── Component ─────────────────────────────────────────────────
const SalaryFilter = () => {
  const {
    dataTime,
    setDataTime,
    experience,
    setExperience,
    gender,
    setGender,
    sortBy,
    setSortBy,
  } = useSalaryFilterFromQuery();

  return (
    <div className={styles.filterBar}>
      <div className={styles.group}>
        <span className={styles.label}>篩選：</span>
        <div className={styles.selectWrapper}>
          <Select
            value={dataTime}
            options={DATA_TIME_OPTIONS}
            onChange={e => setDataTime(e.target.value || null)}
            hasNullOption
            nullOptionText="所有參考時間"
          />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            value={experience}
            options={EXPERIENCE_OPTIONS}
            onChange={e => setExperience(e.target.value || null)}
            hasNullOption
            nullOptionText="所有工作經歷"
          />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            value={gender}
            options={GENDER_OPTIONS}
            onChange={e => setGender(e.target.value || null)}
            hasNullOption
            nullOptionText="所有性別"
          />
        </div>
      </div>
      <div className={styles.sortGroup}>
        <span className={styles.label}>排序：</span>
        <div className={styles.sortSelectWrapper}>
          <Select
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={e => setSortBy(e.target.value || null)}
            hasNullOption
            nullOptionText="參考時間（新→舊）"
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryFilter;
