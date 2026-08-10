import graphqlClient from 'utils/graphqlClient';

const queryLaborRightsMenuGql = /* GraphQL */ `
  query {
    labor_rights {
      id
      title
      coverUrl
    }
  }
`;

export type LaborRightMenuEntry = {
  id: string;
  title: string;
  coverUrl: string | null;
};

// Must be the same as schema from graphql
// TODO: auto generation
type QueryLaborRightsMenuData = {
  labor_rights: LaborRightMenuEntry[];
};

const queryLaborRightsMenu = (): Promise<LaborRightMenuEntry[]> =>
  graphqlClient<QueryLaborRightsMenuData>({
    query: queryLaborRightsMenuGql,
  }).then(data => data.labor_rights);

export default queryLaborRightsMenu;
