import { applySpec, prop, values } from 'ramda';

import {
  DATA_TIME,
  EXPERIENCE,
  SALARY_SORT_BY,
  DataTime,
  Experience,
  SalarySortBy,
} from 'constants/salaryFilter';
import { Gender, GENDER_VALUES } from 'constants/gender';

export type TQueryParams = Record<string, string | undefined>;

const DATA_TIME_VALUES = values(DATA_TIME);
const EXPERIENCE_VALUES = values(EXPERIENCE);
const SALARY_SORT_BY_VALUES = values(SALARY_SORT_BY);

const isOneOf = <T extends string>(validValues: readonly T[]) => (
  value: string | undefined,
): value is T =>
  value !== undefined && (validValues as readonly string[]).includes(value);

const selectOneOf = <T extends string>(
  key: string,
  validValues: readonly T[],
) => (query: TQueryParams): T | null => {
  const value = prop(key, query);
  return isOneOf(validValues)(value) ? value : null;
};

export const dataTimeFromQuerySelector = selectOneOf<DataTime>(
  'data_time',
  DATA_TIME_VALUES,
);

export const experienceFromQuerySelector = selectOneOf<Experience>(
  'experience',
  EXPERIENCE_VALUES,
);

export const genderFromQuerySelector = selectOneOf<Gender>(
  'gender',
  GENDER_VALUES,
);

export const sortByFromQuerySelector = selectOneOf<SalarySortBy>(
  'sort_by',
  SALARY_SORT_BY_VALUES,
);

export const salaryFilterFromQuerySelector: (
  query: TQueryParams,
) => {
  dataTime: DataTime | null;
  experience: Experience | null;
  gender: Gender | null;
  sortBy: SalarySortBy | null;
} = applySpec({
  dataTime: dataTimeFromQuerySelector,
  experience: experienceFromQuerySelector,
  gender: genderFromQuerySelector,
  sortBy: sortByFromQuerySelector,
});
