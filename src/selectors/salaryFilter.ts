import { applySpec, prop } from 'ramda';

import {
  DataTime,
  ExperienceInYears,
  SalaryFilterQueryKey,
  SalarySortBy,
} from 'constants/salaryFilter';
import { Gender } from 'constants/gender';

export type TQueryParams = Record<string, string | undefined>;

const selectFromQuery = <T extends string>(key: string) => (
  query: TQueryParams,
): T | null => {
  const value = prop(key, query);
  return value === undefined ? null : (value as T);
};

export const dataTimeFromQuerySelector = selectFromQuery<DataTime>(
  SalaryFilterQueryKey.DATA_TIME,
);

export const experienceFromQuerySelector = selectFromQuery<ExperienceInYears>(
  SalaryFilterQueryKey.EXPERIENCE,
);

export const genderFromQuerySelector = selectFromQuery<Gender>(
  SalaryFilterQueryKey.GENDER,
);

export const sortByFromQuerySelector = selectFromQuery<SalarySortBy>(
  SalaryFilterQueryKey.SORT_BY,
);

export const salaryFilterFromQuerySelector: (
  query: TQueryParams,
) => {
  dataTime: DataTime | null;
  experience: ExperienceInYears | null;
  gender: Gender | null;
  sortBy: SalarySortBy | null;
} = applySpec({
  dataTime: dataTimeFromQuerySelector,
  experience: experienceFromQuerySelector,
  gender: genderFromQuerySelector,
  sortBy: sortByFromQuerySelector,
});
