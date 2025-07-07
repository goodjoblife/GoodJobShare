import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';

const queryCompanyRatingStatisticsGql = /* GraphQL */ `
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

export type RatingStatistics = {
  averageRating: number;
  ratingDistribution: {
    rating: number;
    count: number;
  }[];
  ratingCount: number;
};

type QueryCompanyRatingStatisticsData = {
  company:
    | (Company & {
        companyRatingStatistics: RatingStatistics | null;
      })
    | null;
};

const queryCompanyRatingStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<RatingStatistics | null> =>
  graphqlClient<QueryCompanyRatingStatisticsData>({
    query: queryCompanyRatingStatisticsGql,
    variables: { companyName },
  }).then(data => (data.company ? data.company.companyRatingStatistics : null));

export default queryCompanyRatingStatistics;
