import {
  experiencePartialGql,
  interviewExperiencePartialGql,
  workExperiencesPartialGql,
} from './experience';

export interface Company {
  name: string;
}

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
          reportCount
          reports {
            id
            reasonCategory
            reason
            createdAt
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

export const getCompanyEsgSalaryDataQuery = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      esgSalaryData {
        avgSalaryStatistics {
          year
          average
          sameIndustryAverage
        }
        nonManagerAvgSalaryStatistics {
          year
          average
          sameIndustryAverage
        }
        nonManagerMedianSalaryStatistics {
          year
          median
        }
        femaleManagerStatistics {
          year
          percentage
        }
      }
    }
  }
`;

export const getCompanyInterviewExperiencesQuery = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    company(name: $companyName) {
      name
      interviewExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        sortBy: $sortBy
      ) {
        count
        interviewExperiences {
          ${experiencePartialGql}
          ${interviewExperiencePartialGql()}
        }
      }
    }
  }
`;

export const getCompanyWorkExperiencesQuery = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    company(name: $companyName) {
      name
      workExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        sortBy: $sortBy
      ) {
        count
        workExperiences {
          ${experiencePartialGql}
          ${workExperiencesPartialGql()}
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

export const queryCompanyIsSubscribedGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      id
      isSubscribed
    }
  }
`;

export const subscribeCompanyGql = /* GraphQL */ `
  mutation SubscribeCompany($input: SubscribeCompanyInput!) {
    subscribeCompany(input: $input) {
      success
    }
  }
`;

export const unsubscribeCompanyGql = /* GraphQL */ `
  mutation UnsubscribeCompany($input: UnsubscribeCompanyInput!) {
    unsubscribeCompany(input: $input) {
      success
    }
  }
`;
