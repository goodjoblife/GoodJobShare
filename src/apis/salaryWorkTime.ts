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
  employment_type: string | null;
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

export type OvertimeFrequencyCount = {
  seldom: number;
  sometimes: number;
  usually: number;
  almost_everyday: number;
};

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

export type SalaryDistributionBin = {
  data_count: number;
  range: {
    type: string;
    from: number;
    to: number;
  };
};

type YesNoOrUnknownCount = {
  yes: number;
  no: number;
  unknown: number;
};

export type SalaryWorkTimeStatistics = {
  count: number;
  is_overtime_salary_legal_count: YesNoOrUnknownCount | null;
  has_compensatory_dayoff_count: YesNoOrUnknownCount | null;
  has_overtime_salary_count: YesNoOrUnknownCount | null;
};
