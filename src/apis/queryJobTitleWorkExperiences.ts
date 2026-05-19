import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { JobTitle } from 'graphql/jobTitle';
import {
  experiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';
import { WorkExperience } from 'apis/experience';

const queryJobTitleWorkExperiencesGql = /* GraphQL */ `
  query(
    $jobTitle: String!
    $companyName: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
  ) {
    job_title(name: $jobTitle) {
      name
      workExperiencesResult(
        companyQuery: $companyName
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

type QueryGetJobTitleWorkExperiencesData = {
  job_title:
    | (JobTitle & {
        workExperiencesResult: {
          count: number;
          workExperiences: WorkExperience[];
        };
      })
    | null;
};

const queryJobTitleWorkExperiences = ({
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
}): Promise<QueryGetJobTitleWorkExperiencesData['job_title']> =>
  graphqlClient<QueryGetJobTitleWorkExperiencesData>({
    query: queryJobTitleWorkExperiencesGql,
    variables: { jobTitle, companyName, start, limit, sortBy },
  }).then(R.prop('job_title'));

export default queryJobTitleWorkExperiences;
