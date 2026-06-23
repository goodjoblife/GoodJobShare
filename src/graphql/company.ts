import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from './experience';

// TODO: 暫時放在這裡，之後搬回 api/
export interface Company {
  name: string;
}

export const getCompanyTimeAndSalaryQuery = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $dataTimeRange: DataTimeRange
    $experienceInYearRange: ExperienceInYearRange
    $gender: Gender
    $sortBy: SalaryResultSortOption
  ) {
    company(name: $companyName) {
      name
      salaryWorkTimesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        dataTimeRange: $dataTimeRange
        experienceInYearRange: $experienceInYearRange
        gender: $gender
        sortBy: $sortBy
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
          gender
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
