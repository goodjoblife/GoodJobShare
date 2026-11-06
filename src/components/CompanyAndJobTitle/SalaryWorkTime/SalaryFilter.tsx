import { faSlidersH } from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { subMonths, subYears } from 'date-fns';
import { LocationState } from 'history';
import qs from 'qs';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory } from 'react-router';

import {
  DataTimeRange,
  ExperienceInYearRange,
  YearMonth,
} from 'apis/salaryWorkTime';
import { Gender, GENDER_OPTIONS } from 'constants/gender';
import {
  DATA_TIME_OPTIONS,
  DataTime,
  EXPERIENCE_OPTIONS,
  ExperienceInYears,
  SalaryFilterQueryKey,
  SORT_OPTIONS,
} from 'constants/salaryFilter';
import { useQuery } from 'hooks/routing';
import {
  dataTimeFromQuerySelector,
  experiencesFromQuerySelector,
  gendersFromQuerySelector,
  sortByFromQuerySelector,
} from 'selectors/salaryFilter';

import styles from './SalaryFilter.module.css';

export {
  dataTimeFromQuerySelector,
  experiencesFromQuerySelector,
  gendersFromQuerySelector,
  sortByFromQuerySelector,
} from 'selectors/salaryFilter';

type TUseUpdateQuery = (
  key: string,
  state?: LocationState,
) => (value: string | null) => void;

type TScrollY = number | null;

type TSalaryFilterProps = {
  y?: TScrollY;
};

type Option<T extends string> = { value: T; label: string };

type TSalaryFilterSelectProps = {
  options: Option<string>[];
  defaultLabel: string;
  value: string | null | undefined;
  onChange: (value: string | null) => void;
};

type FilterValues = {
  dataTime: DataTime | null | undefined;
  experiences: ExperienceInYears[];
  genders: Gender[];
};

const createYearMonth = (date: Date): YearMonth => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

export const getDataTimeRange = (
  dataTime: DataTime | undefined,
  now = new Date(),
): DataTimeRange | undefined => {
  if (!dataTime) return undefined;
  const end = createYearMonth(now);
  switch (dataTime) {
    case DataTime.PAST_MONTH:
      return { start: createYearMonth(subMonths(now, 1)), end };
    case DataTime.PAST_YEAR:
      return { start: createYearMonth(subYears(now, 1)), end };
    case DataTime.PAST_TWO_YEARS:
      return { start: createYearMonth(subYears(now, 2)), end };
  }
};

const getExperienceInYearRange = (
  experience: ExperienceInYears,
): ExperienceInYearRange => {
  switch (experience) {
    case ExperienceInYears.ZERO_THREE:
      return { start: 0, end: 3 };
    case ExperienceInYears.FOUR_SEVEN:
      return { start: 4, end: 7 };
    case ExperienceInYears.EIGHT_PLUS:
      return { start: 8, end: 100 };
  }
};

export const getExperienceInYearRanges = (
  experiences: ExperienceInYears[],
): ExperienceInYearRange[] | undefined =>
  experiences.length > 0
    ? experiences.map(getExperienceInYearRange)
    : undefined;

const useUpdateQuery: TUseUpdateQuery = (key, state) => {
  const history = useHistory();
  const query = useQuery();
  return useCallback(
    (value: string | null) => {
      const { p, ...restQuery } = query;
      const nextQuery = { ...restQuery };
      if (value) {
        nextQuery[key] = value;
      } else {
        delete nextQuery[key];
      }
      history.push({
        search: qs.stringify(nextQuery, { addQueryPrefix: true }),
        state,
      });
    },
    [key, query, history, state],
  );
};

export const useDataTimeFromQuery = (): DataTime | undefined => {
  const query = useQuery();
  return useMemo(() => dataTimeFromQuerySelector(query), [query]);
};

export const useExperiencesFromQuery = (): ExperienceInYears[] => {
  const query = useQuery();
  return useMemo(() => experiencesFromQuerySelector(query), [query]);
};

export const useGendersFromQuery = (): Gender[] => {
  const query = useQuery();
  return useMemo(() => gendersFromQuerySelector(query), [query]);
};

export const useSortByFromQuery = (
  y: TScrollY = null,
): readonly [string | undefined, ReturnType<TUseUpdateQuery>] => {
  const query = useQuery();
  const state = useMemo(() => ({ y }), [y]);
  const setSortBy = useUpdateQuery(SalaryFilterQueryKey.SORT_BY, state);
  return [sortByFromQuerySelector(query), setSortBy] as const;
};

const SalaryFilterSelect = ({
  options,
  defaultLabel,
  value,
  onChange,
}: TSalaryFilterSelectProps): React.ReactElement => (
  <select
    className={styles.select}
    value={value || ''}
    onChange={(event): void => onChange(event.target.value || null)}
  >
    <option value="">{defaultLabel}</option>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const toggleValue = <T extends string>(values: T[], value: T): T[] =>
  values.includes(value)
    ? values.filter(currentValue => currentValue !== value)
    : [...values, value];

const DataTimeFilterRow = ({
  value,
  onChange,
}: {
  value: DataTime | null | undefined;
  onChange: (value: DataTime | undefined) => void;
}): React.ReactElement => (
  <fieldset className={styles.filterRow}>
    <legend>參考時間</legend>
    <div className={styles.options}>
      {[...DATA_TIME_OPTIONS, { value: undefined, label: '不限時間' }].map(
        option => {
          const selected = value === option.value;
          return (
            <button
              type="button"
              key={option.value || 'unlimited'}
              aria-pressed={selected}
              className={cn(styles.option, { [styles.selected]: selected })}
              onClick={(): void => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        },
      )}
    </div>
  </fieldset>
);

const FilterRow = <T extends string>({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  values: T[];
  onChange: (values: T[]) => void;
}): React.ReactElement => {
  const allSelected = values.length === options.length;
  return (
    <fieldset className={styles.filterRow}>
      <legend>{label}</legend>
      <div className={styles.options}>
        <button
          type="button"
          className={styles.option}
          onClick={(): void =>
            onChange(allSelected ? [] : options.map(option => option.value))
          }
        >
          {allSelected ? '清除' : '全部'}
        </button>
        {options.map(option => {
          const selected = values.includes(option.value);
          return (
            <button
              type="button"
              key={option.value}
              aria-pressed={selected}
              className={cn(styles.option, { [styles.selected]: selected })}
              onClick={(): void => onChange(toggleValue(values, option.value))}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

const SalaryFilter = ({ y = null }: TSalaryFilterProps): React.ReactElement => {
  const history = useHistory();
  const query = useQuery();
  const filterRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dataTime = useMemo(() => dataTimeFromQuerySelector(query), [query]);
  const experiences = useMemo(() => experiencesFromQuerySelector(query), [
    query,
  ]);
  const genders = useMemo(() => gendersFromQuerySelector(query), [query]);
  const [draft, setDraft] = useState<FilterValues>({
    dataTime: dataTime || null,
    experiences,
    genders,
  });
  const [sortBy, setSortBy] = useSortByFromQuery(y);

  const openFilter = (): void => {
    setDraft({ dataTime: dataTime || null, experiences, genders });
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnOutsideClick = (event: MouseEvent): void => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return (): void => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const apply = (): void => {
    const { p, ...restQuery } = query;
    const nextQuery = { ...restQuery };
    const setQueryValues = (
      key: SalaryFilterQueryKey,
      values: string[],
    ): void => {
      if (values.length > 0) nextQuery[key] = values;
      else delete nextQuery[key];
    };
    if (draft.dataTime)
      nextQuery[SalaryFilterQueryKey.DATA_TIME] = draft.dataTime;
    else delete nextQuery[SalaryFilterQueryKey.DATA_TIME];
    setQueryValues(SalaryFilterQueryKey.EXPERIENCE, draft.experiences);
    setQueryValues(SalaryFilterQueryKey.GENDER, draft.genders);
    history.push({
      search: qs.stringify(nextQuery, {
        addQueryPrefix: true,
        arrayFormat: 'repeat',
      }),
      state: { y },
    });
    setIsOpen(false);
  };

  const hasFilters =
    dataTime !== undefined || experiences.length > 0 || genders.length > 0;

  return (
    <div className={styles.filterBar}>
      <div ref={filterRef} className={styles.filterControl}>
        <button
          type="button"
          className={cn(styles.filterButton, {
            [styles.filterButtonActive]: hasFilters,
          })}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={(): void => (isOpen ? setIsOpen(false) : openFilter())}
        >
          <span className={styles.filterIcon} aria-hidden="true">
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          篩選
          <span className={styles.chevron} aria-hidden="true" />
        </button>
        {isOpen && (
          <>
            <button
              type="button"
              className={styles.backdrop}
              aria-label="關閉篩選"
              onClick={(): void => setIsOpen(false)}
            />
            <div className={styles.panel} role="dialog" aria-label="薪資篩選">
              <div className={styles.rows}>
                <DataTimeFilterRow
                  value={draft.dataTime}
                  onChange={(value): void =>
                    setDraft(current => ({ ...current, dataTime: value }))
                  }
                />
                <FilterRow
                  label="工作經歷"
                  options={EXPERIENCE_OPTIONS}
                  values={draft.experiences}
                  onChange={(values): void =>
                    setDraft(current => ({ ...current, experiences: values }))
                  }
                />
                <FilterRow
                  label="性別"
                  options={GENDER_OPTIONS}
                  values={draft.genders}
                  onChange={(values): void =>
                    setDraft(current => ({ ...current, genders: values }))
                  }
                />
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={(): void =>
                    setDraft({
                      dataTime: null,
                      experiences: [],
                      genders: [],
                    })
                  }
                >
                  清除全部
                </button>
                <button
                  type="button"
                  className={styles.applyButton}
                  onClick={apply}
                >
                  套用
                </button>
              </div>
            </div>
          </>
        )}
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
