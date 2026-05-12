import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import { WorkExperience } from 'apis/experience';
import {
  experiencePartialGql,
  workExperiencesPartialGql,
} from 'graphql/experience';

const queryCompanyWorkExperiencesGql = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $sortBy: DataResultSortOption
    $aspectFilter: AspectFilter
  ) {
    company(name: $companyName) {
      name
      workExperiencesResult(
        jobTitle: $jobTitle
        start: $start
        limit: $limit
        sortBy: $sortBy
        aspectFilter: $aspectFilter
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

type QueryCompanyWorkExperiencesData = {
  company:
    | (Company & {
        workExperiencesResult: {
          count: number;
          workExperiences: WorkExperience[];
        };
      })
    | null;
};

const queryCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
  aspectFilter,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
  aspectFilter?: string;
}): Promise<QueryCompanyWorkExperiencesData['company']> =>
  graphqlClient<QueryCompanyWorkExperiencesData>({
    query: queryCompanyWorkExperiencesGql,
    variables: { companyName, jobTitle, start, limit, sortBy, aspectFilter },
  }).then(R.prop('company'));

export default queryCompanyWorkExperiences;
