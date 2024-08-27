// TODO: DEPRECATED
export const getCompanyQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
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

export const queryCompanyOverviewGql = /* GraphQL */ `
  query(
    $companyName: String!
    $interviewExperiencesLimit: Int!
    $workExperiencesLimit: Int!
    $salaryWorkTimesLimit: Int!
  ) {
    company(name: $companyName) {
      name
      interviewExperiencesResult(start: 0, limit: $interviewExperiencesLimit) {
        count
        interviewExperiences {
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
      }
      workExperiencesResult(start: 0, limit: $workExperiencesLimit) {
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
      salaryWorkTimesResult(start: 0, limit: $salaryWorkTimesLimit) {
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

export const getCompanyTimeAndSalaryQuery = /* GraphQL */ `
  query($companyName: String!, $jobTitle: String, $start: Int!, $limit: Int!) {
    company(name: $companyName) {
      name
      salaryWorkTimesResult(jobTitle: $jobTitle, start: $start, limit: $limit) {
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
          data_time {
            month
            year
          }
        }
      }
    }
  }
`;

export const getCompanyTimeAndSalaryStatisticsQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
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

export const getCompanyInterviewExperiencesQuery = /* GraphQL */ `
  query($companyName: String!, $jobTitle: String, $start: Int!, $limit: Int!) {
    company(name: $companyName) {
      name
      interviewExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
      ) {
        count
        interviewExperiences {
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
      }
    }
  }
`;

export const getCompanyWorkExperiencesQuery = /* GraphQL */ `
  query($companyName: String!, $jobTitle: String, $start: Int!, $limit: Int!) {
    company(name: $companyName) {
      name
      workExperiencesResult(jobTitle: $jobTitle, start: $start, limit: $limit) {
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

export const queryCompaniesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    companiesHavingData(start: $start, limit: $limit) {
      name
      businessNumber
      dataCount
    }
    companiesHavingDataCount
  }
`;
