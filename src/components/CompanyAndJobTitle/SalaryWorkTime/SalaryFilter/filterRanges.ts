import { subMonths, subYears } from 'date-fns';

import {
  DataTimeRange,
  ExperienceInYearRange,
  YearMonth,
} from 'apis/salaryWorkTime';
import { DataTime, ExperienceInYears } from 'constants/salaryFilter';

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
