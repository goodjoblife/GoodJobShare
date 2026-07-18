import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from './experience';

// TODO: 暫時放在這裡，之後搬回 api/
export interface Company {
  name: string;
}

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
