import { applySpec, prop } from 'ramda';

import {
  DataTime,
  ExperienceInYears,
  SalaryFilterQueryKey,
  SalarySortBy,
} from 'constants/salaryFilter';
import { Gender } from 'constants/gender';

export type TQueryParams = Record<string, string | undefined>;

export const dataTimeFromQuerySelector = prop(SalaryFilterQueryKey.DATA_TIME);

export const experienceFromQuerySelector = prop(
  SalaryFilterQueryKey.EXPERIENCE,
);

export const genderFromQuerySelector = prop(SalaryFilterQueryKey.GENDER);

export const sortByFromQuerySelector = prop(SalaryFilterQueryKey.SORT_BY);

export const salaryFilterFromQuerySelector: (
  query: TQueryParams,
) => {
  dataTime: DataTime | undefined;
  experience: ExperienceInYears | undefined;
  gender: Gender | undefined;
  sortBy: SalarySortBy | undefined;
} = applySpec({
  dataTime: dataTimeFromQuerySelector,
  experience: experienceFromQuerySelector,
  gender: genderFromQuerySelector,
  sortBy: sortByFromQuerySelector,
});
