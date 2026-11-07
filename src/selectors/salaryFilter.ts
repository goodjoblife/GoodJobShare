import { ParsedQs } from 'qs';

import { Gender } from 'constants/gender';
import {
  DataTime,
  ExperienceInYears,
  SalaryFilterQueryKey,
} from 'constants/salaryFilter';

const stringsFromQuery = (query: ParsedQs, key: string): string[] => {
  const value = query[key];
  if (typeof value === 'string') return [value];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
};

const enumValuesFromQuery = <T extends string>(
  query: ParsedQs,
  key: string,
  values: readonly T[],
): T[] => {
  const allowedValues = new Set<string>(values);
  return stringsFromQuery(query, key).filter((value): value is T =>
    allowedValues.has(value),
  );
};

export const dataTimeFromQuerySelector = (
  query: ParsedQs,
): DataTime | undefined =>
  enumValuesFromQuery(
    query,
    SalaryFilterQueryKey.DATA_TIME,
    Object.values(DataTime),
  )[0];

export const experiencesFromQuerySelector = (
  query: ParsedQs,
): ExperienceInYears[] =>
  enumValuesFromQuery(
    query,
    SalaryFilterQueryKey.EXPERIENCE,
    Object.values(ExperienceInYears),
  );

export const gendersFromQuerySelector = (query: ParsedQs): Gender[] =>
  enumValuesFromQuery(
    query,
    SalaryFilterQueryKey.GENDER,
    Object.values(Gender),
  );

export const sortByFromQuerySelector = (
  query: ParsedQs,
): string | undefined => {
  const value = query[SalaryFilterQueryKey.SORT_BY];
  return typeof value === 'string' ? value : undefined;
};
