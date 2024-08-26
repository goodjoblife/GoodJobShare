export const queryJobTitles = /* GraphQL */ `
  query($key: String!) {
    job_titles(query: $key, page: 0) {
      name
    }
  }
`;

export const getJobTitleQuery = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
      name
      interview_experiences {
        id
        type
        originalCompanyName
        company {
          name
        }
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
        company {
          name
        }
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
        originalCompanyName
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
      }
      salary_distribution {
        bins {
          data_count
          range {
            type
            from
            to
          }
        }
      }
    }
  }
`;

export const getJobTitleTimeAndSalaryQuery = /* GraphQL */ `
  query($jobTitle: String!, $companyName: String, $start: Int!, $limit: Int!) {
    job_title(name: $jobTitle) {
      name
      salaryWorkTimesResult(
        companyQuery: $companyName
        start: $start
        limit: $limit
      ) {
        count
        salaryWorkTimes {
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
      }
      salary_distribution {
        bins {
          data_count
          range {
            type
            from
            to
          }
        }
      }
    }
  }
`;

export const getJobTitleWorkExperiencesQuery = /* GraphQL */ `
  query($jobTitle: String!, $companyName: String, $start: Int!, $limit: Int!) {
    job_title(name: $jobTitle) {
      name
      workExperiencesResult(
        companyQuery: $companyName
        start: $start
        limit: $limit
      ) {
        count
        workExperiences {
          id
          type
          originalCompanyName
          company {
            name
          }
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
      }
    }
  }
`;

export const queryJobTitlesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    jobTitlesHavingData(start: $start, limit: $limit) {
      name
    }
    jobTitlesHavingDataCount
  }
`;
