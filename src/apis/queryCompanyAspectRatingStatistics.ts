import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import { AspectRatingStatistics } from './aspectRatingStatistics';

const queryCompanyAspectRatingStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      companyAspectRatingStatistics {
        aspect
        averageRating
        ratingCount
        type
        ratingDistribution {
          count
          rating
        }
      }
    }
  }
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
