import { ParsedQs } from 'qs';

import { DataTime, SalaryFilterQueryKey } from 'constants/salaryFilter';

const stringFromQuery = (query: ParsedQs, key: string): string | undefined => {
  const val = query[key];
  return typeof val === 'string' ? val : undefined;
};

const isDataTime = (val: string): val is DataTime =>
  (Object.values(DataTime) as string[]).includes(val);

export const dataTimeFromQuerySelector = (
  query: ParsedQs,
): DataTime | undefined => {
  const val = stringFromQuery(query, SalaryFilterQueryKey.DATA_TIME);
  return val !== undefined && isDataTime(val) ? val : undefined;
};

export const experienceFromQuerySelector = (
  query: ParsedQs,
): string | undefined =>
  stringFromQuery(query, SalaryFilterQueryKey.EXPERIENCE);

export const genderFromQuerySelector = (query: ParsedQs): string | undefined =>
  stringFromQuery(query, SalaryFilterQueryKey.GENDER);

export const sortByFromQuerySelector = (query: ParsedQs): string | undefined =>
  stringFromQuery(query, SalaryFilterQueryKey.SORT_BY);
