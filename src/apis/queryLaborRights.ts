import graphqlClient from 'utils/graphqlClient';

const queryLaborRightsGql = /* GraphQL */ `
  query($id: ID!) {
    labor_right(id: $id) {
      id
      title
      order
      description
      content
      seoTitle
      seoDescription
      seoText
      coverUrl
      nPublicPages
      descriptionInPermissionBlock
    }
  }
`;

export type LaborRightEntry = {
  id: string;
  title: string;
  order: number | null;
  description: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoText: string | null;
  coverUrl: string | null;
  nPublicPages: number | null;
  descriptionInPermissionBlock: string | null;
};

// Must be the same as schema from graphql
// TODO: auto generation
type QueryLaborRightsData = {
  labor_right: LaborRightEntry | null;
};

const queryLaborRights = ({
  entryId,
}: {
  entryId: string;
}): Promise<LaborRightEntry | null> =>
  graphqlClient<QueryLaborRightsData>({
    query: queryLaborRightsGql,
    variables: {
      id: entryId,
    },
  }).then(data => data.labor_right);

export default queryLaborRights;
