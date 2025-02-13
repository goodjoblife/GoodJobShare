export const queryLaborRightsMenuGql = /* GraphQL */ `
  query {
    labor_rights {
      id
      title
      coverUrl
    }
  }
`;

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
