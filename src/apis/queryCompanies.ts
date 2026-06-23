import graphqlClient from 'utils/graphqlClient';

const queryCompaniesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    companiesHavingData(start: $start, limit: $limit) {
      name
      businessNumber
      dataCount
    }
    companiesHavingDataCount
  }
`;

export type CompanyInIndex = {
  name: string;
  businessNumber: string | null;
  dataCount: number;
};

type QueryCompaniesData = {
  companiesHavingData: CompanyInIndex[];
  companiesHavingDataCount: number;
};

const queryCompanies = ({
  start,
  limit,
}: {
  start: number;
  limit: number;
}): Promise<QueryCompaniesData> =>
  graphqlClient<QueryCompaniesData>({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });

export default queryCompanies;
