export const queryLaborRightsMenuGql = /* GraphQL */ `
  query {
    labor_rights {
      id
      title
      coverUrl
    }
  }
`;

// Must be the same as schema from graphql
// TODO: auto generation
export type LaborRightMenuEntry = {
  id: string;
  title: string;
  coverUrl: string | null;
};

export const queryLaborRightsGql = /* GraphQL */ `
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

// Must be the same as schema from graphql
// TODO: auto generation
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
