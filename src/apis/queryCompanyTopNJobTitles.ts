import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyTopNJobTitlesGql = /* GraphQL */ `
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

export type TopNJobTitles = {
  work: { name: string }[];
  interview: { name: string }[];
  salary: { name: string }[];
  all: { name: string }[];
};

type QueryCompanyTopNJobTitlesData = {
  company:
    | (Company & {
        topNJobTitles: TopNJobTitles;
      })
    | null;
};

const queryCompanyTopNJobTitles = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanyTopNJobTitlesData['company']> =>
  graphqlClient<QueryCompanyTopNJobTitlesData>({
    query: queryCompanyTopNJobTitlesGql,
    variables: { companyName },
  }).then(data => data.company);

export default queryCompanyTopNJobTitles;
