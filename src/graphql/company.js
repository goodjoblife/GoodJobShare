export const queryCompanyRatingStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      companyRatingStatistics {
        averageRating
        ratingDistribution {
          rating
          count
        }
        ratingCount
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
          data_time {
            month
            year
          }
        }
      }
    }
  }
`;

export const queryCompanyOverviewStatisticsQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      salary_work_time_statistics {
        average_week_work_time
        overtime_frequency_count {
          seldom
          sometimes
          usually
          almost_everyday
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

export const getCompanyTopNJobTitlesQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      topNJobTitles {
        work {
          name
        }
        interview {
          name
        }
        salary {
          name
        }
        all {
          name
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
          averageSectionRating
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
          averageSectionRating
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
