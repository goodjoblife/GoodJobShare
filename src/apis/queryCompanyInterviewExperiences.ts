import R from 'ramda';

import { InterviewExperience } from 'apis/experience';
import { Company } from 'graphql/company';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from 'graphql/experience';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyInterviewExperiencesGql = /* GraphQL */ `
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

type QueryCompanyInterviewExperiencesData = {
  company:
    | (Company & {
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: InterviewExperience[];
        };
      })
    | null;
};

const queryCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
}): Promise<QueryCompanyInterviewExperiencesData['company']> =>
  graphqlClient<QueryCompanyInterviewExperiencesData>({
    query: queryCompanyInterviewExperiencesGql,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export default queryCompanyInterviewExperiences;
