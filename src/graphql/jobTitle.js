export const queryJobTitles = /* GraphQL */ `
  query($key: String!) {
    job_titles(query: $key, page: 0) {
      name
    }
  }
`;

export const queryJobTitleOverviewGql = /* GraphQL */ `
  query(
    $jobTitle: String!
    $interviewExperiencesLimit: Int!
    $workExperiencesLimit: Int!
    $salaryWorkTimesLimit: Int!
  ) {
    job_title(name: $jobTitle) {
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
          averageSectionRating
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
          averageSectionRating
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
          originalCompanyName
          data_time {
            month
            year
          }
        }
      }
      salary_work_time_statistics {
        average_week_work_time
        overtime_frequency_count {
          seldom
          sometimes
          usually
          almost_everyday
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
    }
  }
`;

export const getJobTitleTimeAndSalaryStatisticsQuery = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
      name
      salary_work_time_statistics {
        count
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
    }
  }
`;

export const getJobTitleInterviewExperiencesQuery = /* GraphQL */ `
  query($jobTitle: String!, $companyName: String, $start: Int!, $limit: Int!) {
    job_title(name: $jobTitle) {
      name
      interviewExperiencesResult(
        companyQuery: $companyName
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
          averageSectionRating
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
          averageSectionRating
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
