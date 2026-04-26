export const DATA_TIME = {
  PAST_MONTH: 'past_month',
  PAST_YEAR: 'past_year',
  PAST_TWO_YEARS: 'past_two_years',
} as const;

export type DataTime = (typeof DATA_TIME)[keyof typeof DATA_TIME];

export const DATA_TIME_OPTIONS = [
  { value: DATA_TIME.PAST_MONTH, label: '過去一個月' },
  { value: DATA_TIME.PAST_YEAR, label: '過去一年' },
  { value: DATA_TIME.PAST_TWO_YEARS, label: '過去兩年' },
];

export const EXPERIENCE = {
  ZERO_THREE: '0_3',
  FOUR_SEVEN: '4_7',
  EIGHT_PLUS: '8_plus',
} as const;

export type Experience = (typeof EXPERIENCE)[keyof typeof EXPERIENCE];

export const EXPERIENCE_OPTIONS = [
  { value: EXPERIENCE.ZERO_THREE, label: '0~3 年' },
  { value: EXPERIENCE.FOUR_SEVEN, label: '4~7 年' },
  { value: EXPERIENCE.EIGHT_PLUS, label: '8 年以上' },
];

export const SALARY_SORT_BY = {
  EARLIEST_FIRST: 'EARLIEST_FIRST',
  HIGH_HOUR_SALARY_FIRST: 'HIGH_HOUR_SALARY_FIRST',
  LOW_HOUR_SALARY_FIRST: 'LOW_HOUR_SALARY_FIRST',
  HIGH_WEEK_HOUR_FIRST: 'HIGH_WEEK_HOUR_FIRST',
  LOW_WEEK_HOUR_FIRST: 'LOW_WEEK_HOUR_FIRST',
} as const;

export type SalarySortBy = (typeof SALARY_SORT_BY)[keyof typeof SALARY_SORT_BY];

export const SORT_OPTIONS = [
  { value: SALARY_SORT_BY.EARLIEST_FIRST, label: '參考時間（舊→新）' },
  { value: SALARY_SORT_BY.HIGH_HOUR_SALARY_FIRST, label: '估計時薪（高→低）' },
  { value: SALARY_SORT_BY.LOW_HOUR_SALARY_FIRST, label: '估計時薪（低→高）' },
  { value: SALARY_SORT_BY.HIGH_WEEK_HOUR_FIRST, label: '一週總工時（高→低）' },
  { value: SALARY_SORT_BY.LOW_WEEK_HOUR_FIRST, label: '一週總工時（低→高）' },
];
