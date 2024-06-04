export const getCompanyQuery = `
query($companyName: String!) {
  company(name: $companyName) {
    interview_experiences {
      id
      type
      originalCompanyName
      job_title {
        name
      }
      region
      experience_in_year
      education
      salary {
        amount
        type
      }
      title
      sections {
        subtitle
        content
      }
      created_at
      reply_count
      like_count
      overall_rating
    }
    work_experiences {
      id
      type
      originalCompanyName
      job_title {
        name
      }
    	region
      experience_in_year
      education
      salary {
        amount
        type
      }
      title
      sections {
        subtitle
        content
      }
      created_at
      reply_count
      like_count
      recommend_to_others
    }
    salary_work_times {
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
      data_time {
        month
        year
      }
    }
    salary_work_time_statistics {
      count
      average_estimated_hourly_wage
      average_week_work_time
      overtime_frequency_count {
        seldom
        sometimes
        usually
        almost_everyday
      }
      is_overtime_salary_legal_count {
        yes
        no
        unknown
      }
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
      job_average_salaries {
        job_title {
          name
        }
        average_salary {
          type
          amount
        }
        data_count
      }
    }
  }
}
`;

export const getCompaniesHavingDataQuery = `
{
  companies_having_data {
    name
  }
}
`;
