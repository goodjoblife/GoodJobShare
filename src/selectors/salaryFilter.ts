import { ParsedQs } from 'qs';

import { SalaryFilterQueryKey } from 'constants/salaryFilter';

const stringFromQuery = (query: ParsedQs, key: string): string | undefined => {
  const val = query[key];
  return typeof val === 'string' ? val : undefined;
};

export const dataTimeFromQuerySelector = (
  query: ParsedQs,
): string | undefined => stringFromQuery(query, SalaryFilterQueryKey.DATA_TIME);

export const experienceFromQuerySelector = (
  query: ParsedQs,
): string | undefined =>
  stringFromQuery(query, SalaryFilterQueryKey.EXPERIENCE);

export const genderFromQuerySelector = (query: ParsedQs): string | undefined =>
  stringFromQuery(query, SalaryFilterQueryKey.GENDER);

export const sortByFromQuerySelector = (query: ParsedQs): string | undefined =>
  stringFromQuery(query, SalaryFilterQueryKey.SORT_BY);
