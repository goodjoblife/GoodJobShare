import R from 'ramda';

import { InterviewExperience } from 'apis/experience';
import {
  experiencePartialGql,
  interviewExperiencePartialGql,
} from 'graphql/experience';
import { JobTitle } from 'graphql/jobTitle';
import graphqlClient from 'utils/graphqlClient';

const queryJobTitleInterviewExperiencesGql = /* GraphQL */ `
  query(
    $jobTitle: String!
    $companyName: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    job_title(name: $jobTitle) {
      name
      interviewExperiencesResult(
        companyQuery: $companyName
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

type QueryJobTitleInterviewExperiencesData = {
  job_title:
    | (JobTitle & {
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: InterviewExperience[];
        };
      })
    | null;
};

const queryJobTitleInterviewExperiences = ({
  jobTitle,
  companyName,
  start,
  limit,
  sortBy,
}: {
  jobTitle: string;
  companyName?: string;
  start: number;
  limit: number;
  sortBy?: string;
}): Promise<QueryJobTitleInterviewExperiencesData['job_title']> =>
  graphqlClient<QueryJobTitleInterviewExperiencesData>({
    query: queryJobTitleInterviewExperiencesGql,
    variables: { jobTitle, companyName, start, limit, sortBy },
  }).then(R.prop('job_title'));

export default queryJobTitleInterviewExperiences;
