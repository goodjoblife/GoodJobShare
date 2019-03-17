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
    }
  }
`;
