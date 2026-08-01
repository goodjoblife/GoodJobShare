// Must be the same as graphql schema (EmploymentType)
export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  INTERN = 'intern',
  TEMPORARY = 'temporary',
  CONTRACT = 'contract',
  DISPATCHED_LABOR = 'dispatched_labor',
}

export const employmentTypeTranslation: Record<EmploymentType, string> = {
  [EmploymentType.FULL_TIME]: '全職',
  [EmploymentType.PART_TIME]: '兼職(含打工)',
  [EmploymentType.INTERN]: '實習',
  [EmploymentType.TEMPORARY]: '臨時工',
  [EmploymentType.CONTRACT]: '約聘雇',
  [EmploymentType.DISPATCHED_LABOR]: '派遣',
};
