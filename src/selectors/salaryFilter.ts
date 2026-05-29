import { prop } from 'ramda';

import { SalaryFilterQueryKey } from 'constants/salaryFilter';

export type TQueryParams = Record<string, string | undefined>;

export const dataTimeFromQuerySelector = prop(SalaryFilterQueryKey.DATA_TIME);

export const experienceFromQuerySelector = prop(
  SalaryFilterQueryKey.EXPERIENCE,
);

export const genderFromQuerySelector = prop(SalaryFilterQueryKey.GENDER);

export const sortByFromQuerySelector = prop(SalaryFilterQueryKey.SORT_BY);
