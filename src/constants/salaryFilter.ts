export enum SalaryFilterQueryKey {
  DATA_TIME = 'data_time',
  EXPERIENCE = 'experience',
  GENDER = 'gender',
  SORT_BY = 'sort_by',
}

export enum DataTime {
  PAST_MONTH = 'past_month',
  PAST_YEAR = 'past_year',
  PAST_TWO_YEARS = 'past_two_years',
}

export const DATA_TIME_OPTIONS = [
  { value: DataTime.PAST_MONTH, label: '過去一個月' },
  { value: DataTime.PAST_YEAR, label: '過去一年' },
  { value: DataTime.PAST_TWO_YEARS, label: '過去兩年' },
];

export enum ExperienceInYears {
  ZERO_THREE = '0_3',
  FOUR_SEVEN = '4_7',
  EIGHT_PLUS = '8_plus',
}

export const EXPERIENCE_OPTIONS = [
  { value: ExperienceInYears.ZERO_THREE, label: '0~3 年' },
  { value: ExperienceInYears.FOUR_SEVEN, label: '4~7 年' },
  { value: ExperienceInYears.EIGHT_PLUS, label: '8 年以上' },
];

export enum SalarySortBy {
  EARLIEST_FIRST = 'EARLIEST_FIRST',
  HIGH_HOUR_SALARY_FIRST = 'HIGH_HOUR_SALARY_FIRST',
  LOW_HOUR_SALARY_FIRST = 'LOW_HOUR_SALARY_FIRST',
  HIGH_WEEK_HOUR_FIRST = 'HIGH_WEEK_HOUR_FIRST',
  LOW_WEEK_HOUR_FIRST = 'LOW_WEEK_HOUR_FIRST',
}

export const SORT_OPTIONS = [
  { value: SalarySortBy.EARLIEST_FIRST, label: '參考時間（舊→新）' },
  { value: SalarySortBy.HIGH_HOUR_SALARY_FIRST, label: '估計時薪（高→低）' },
  { value: SalarySortBy.LOW_HOUR_SALARY_FIRST, label: '估計時薪（低→高）' },
  { value: SalarySortBy.HIGH_WEEK_HOUR_FIRST, label: '一週總工時（高→低）' },
  { value: SalarySortBy.LOW_WEEK_HOUR_FIRST, label: '一週總工時（低→高）' },
];
