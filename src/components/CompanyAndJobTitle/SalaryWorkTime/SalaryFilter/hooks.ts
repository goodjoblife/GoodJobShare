import { LocationState } from 'history';
import qs from 'qs';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Gender } from 'constants/gender';
import {
  DataTime,
  ExperienceInYears,
  SalaryFilterQueryKey,
} from 'constants/salaryFilter';
import { useQuery } from 'hooks/routing';
import {
  dataTimeFromQuerySelector,
  experiencesFromQuerySelector,
  gendersFromQuerySelector,
  sortByFromQuerySelector,
} from 'selectors/salaryFilter';

export type TScrollY = number | null;

export type FilterValues = {
  dataTime: DataTime | null;
  experiences: ExperienceInYears[];
  genders: Gender[];
};

type TUseUpdateQuery = (
  key: string,
  state?: LocationState,
) => (value: string | null) => void;

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

export const useFilterValuesFromQuery = (): FilterValues => {
  const dataTime = useDataTimeFromQuery();
  const experiences = useExperiencesFromQuery();
  const genders = useGendersFromQuery();
  return useMemo(() => ({ dataTime: dataTime || null, experiences, genders }), [
    dataTime,
    experiences,
    genders,
  ]);
};

export const useApplyFilterValues = (
  y: TScrollY,
): ((values: FilterValues) => void) => {
  const history = useHistory();
  const query = useQuery();
  return useCallback(
    (values: FilterValues) => {
      const { p, ...restQuery } = query;
      const nextQuery = { ...restQuery };
      const setQueryValues = (
        key: SalaryFilterQueryKey,
        queryValues: string[],
      ): void => {
        if (queryValues.length > 0) nextQuery[key] = queryValues;
        else delete nextQuery[key];
      };
      if (values.dataTime)
        nextQuery[SalaryFilterQueryKey.DATA_TIME] = values.dataTime;
      else delete nextQuery[SalaryFilterQueryKey.DATA_TIME];
      setQueryValues(SalaryFilterQueryKey.EXPERIENCE, values.experiences);
      setQueryValues(SalaryFilterQueryKey.GENDER, values.genders);
      history.push({
        search: qs.stringify(nextQuery, {
          addQueryPrefix: true,
          arrayFormat: 'repeat',
        }),
        state: { y },
      });
    },
    [query, history, y],
  );
};
