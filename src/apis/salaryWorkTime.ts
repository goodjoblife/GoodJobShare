import { EmploymentType } from 'constants/employmentType';

export const fragmentSalaryWorkTimeFields = /* GraphQL */ `
  fragment salaryWorkTimeFields on SalaryWorkTime {
    id
    week_work_time
    salary {
      type
      amount
    }
    sector
    day_real_work_time
    day_promised_work_time
    experience_in_year
    estimated_hourly_wage
    overtime_frequency
    employment_type
    gender
    job_title {
      name
    }
    company {
      name
    }
    originalCompanyName
    data_time {
      month
      year
    }
    reportCount
    reports {
      id
      reasonCategory
      reason
      createdAt
    }
  }
`;

export type YearMonth = {
  year: number;
  month: number;
};

export type DataTimeRange = {
  start: YearMonth;
  end: YearMonth;
};

export type ExperienceInYearRange = {
  start: number;
  end: number;
};

// Must be the same as fragment
export type SalaryWorkTime = {
  id: string;
  week_work_time: number | null;
  salary: {
    type: string;
    amount: number;
  } | null;
  sector: string | null;
  day_real_work_time: number | null;
  day_promised_work_time: number | null;
  experience_in_year: number | null;
  estimated_hourly_wage: number | null;
  overtime_frequency: number | null;
  employment_type: EmploymentType | null;
  gender: string | null;
  job_title: {
    name: string;
  };
  company: {
    name: string;
  };
  originalCompanyName: string;
  data_time: {
    month: number;
    year: number;
  };
  reportCount: number;
  reports: {
    id: string;
    reasonCategory: string;
    reason: string | null;
    createdAt: string;
  }[];
};

// Must be the same as graphql schema
export type OvertimeFrequencyCount = {
  seldom: number;
  sometimes: number;
  usually: number;
  almost_everyday: number;
};

// Must be the same as graphql schema
export type JobAverageSalary = {
  job_title: {
    name: string;
  };
  average_salary: {
    type: string;
    amount: number;
  };
  data_count: number;
};

// Must be the same as graphql schema
export type SalaryDistributionBin = {
  data_count: number;
  range: {
    type: string;
    from: number;
    to: number;
  };
};

// Must be the same as graphql schema
export type YesNoOrUnknownCount = {
  yes: number;
  no: number;
  unknown: number;
};

// Must be the same as graphql schema
export type SalaryWorkTimeStatistics = {
  count: number;
  average_week_work_time: number | null;
  average_estimated_hourly_wage: number | null;
  has_compensatory_dayoff_count: YesNoOrUnknownCount | null;
  has_overtime_salary_count: YesNoOrUnknownCount | null;
  is_overtime_salary_legal_count: YesNoOrUnknownCount | null;
  overtime_frequency_count: OvertimeFrequencyCount | null;
  job_average_salaries: JobAverageSalary[];
};

export type OvertimeStats = Pick<
  SalaryWorkTimeStatistics,
  | 'count'
  | 'is_overtime_salary_legal_count'
  | 'has_compensatory_dayoff_count'
  | 'has_overtime_salary_count'
>;
