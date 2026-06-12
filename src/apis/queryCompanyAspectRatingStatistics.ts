import R from 'ramda';

import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

import {
  AspectRatingStatistics,
  fragmentAspectRatingStatisticsFields,
} from './aspectRatingStatistics';

const queryCompanyAspectRatingStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      companyAspectRatingStatistics {
        ...aspectRatingStatisticsFields
      }
    }
  }
  ${fragmentAspectRatingStatisticsFields}
`;

type QueryCompanyAspectRatingStatisticsData = {
  company:
    | (Company & {
        companyAspectRatingStatistics: AspectRatingStatistics[];
      })
    | null;
};

const queryCompanyAspectRatingStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanyAspectRatingStatisticsData['company']> =>
  graphqlClient<QueryCompanyAspectRatingStatisticsData>({
    query: queryCompanyAspectRatingStatisticsGql,
    variables: { companyName },
  }).then(R.prop('company'));

export default queryCompanyAspectRatingStatistics;
