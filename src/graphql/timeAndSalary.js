export const getSalaryWorkTimeCount = `
{
  salary_work_time_count
}
`;

export const getSalaryWorkTimes = `
query($start: Int!, $limit: Int!) {
  salary_work_time_count
  salary_work_times(start: $start, limit: $limit) {
    company {
      name
    }
    job_title {
      name
    }
    overtime_frequency
    salary {
      type
      amount
    }
    sector
    week_work_time
    data_time {
      year
      month
    }
    estimated_hourly_wage
    about_this_job
  }
}
`;

export const getSearchCompanyQuery = `
  query($companyName:String!) {
    search_companies(query:$companyName) {
      name
      salary_work_time_statistics {
        count
      }
    }
  }
`;

export const getCompanyQuery = `
  query($companyName:String!) {
    company(name:$companyName) {
      name
      salary_work_times {
        id
        job_title {
          name
        }
        sector
        employment_type
        day_promised_work_time
        day_real_work_time
        week_work_time
        overtime_frequency
        experience_in_year
        salary {
          type
          amount
        }
        estimated_hourly_wage
        data_time {
          year
          month
        }
      }
      salary_work_time_statistics {
        count
        average_week_work_time
        average_estimated_hourly_wage
        has_compensatory_dayoff_count {
          yes
          no
          unknown
        }
        has_overtime_salary_count {
          yes
          no
          unknown
        }
        is_overtime_salary_legal_count {
          yes
          no
          unknown
        }
      }
    }
  }
`;

export const getSearchJobTitleQuery = `
  query($jobTitle:String!) {
    search_job_titles(query:$jobTitle) {
      name
      salary_work_time_statistics {
        count
      }
    }
  }
`;

export const getJobTitleQuery = `
  query($jobTitle:String!) {
    job_title(name:$jobTitle) {
      name
      salary_work_times {
        id
        company {
          name
        }
        sector
        employment_type
        day_promised_work_time
        day_real_work_time
        week_work_time
        overtime_frequency
        experience_in_year
        salary {
          type
          amount
        }
        estimated_hourly_wage
        data_time {
          year
          month
        }
      }
      salary_work_time_statistics {
        count
        average_week_work_time
        average_estimated_hourly_wage
        has_compensatory_dayoff_count {
          yes
          no
          unknown
        }
        has_overtime_salary_count {
          yes
          no
          unknown
        }
        is_overtime_salary_legal_count {
          yes
          no
          unknown
        }
      }
    }
  }
`;

export const changeSalaryWorkTimeStatus = `
changeSalaryWorkTimeStatus(input: ChangeSalaryWorkTimeStatusInput!) {
  salary_work_time
}
`;
