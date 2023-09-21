import graphqlClient from 'utils/graphqlClient';

const getMenuEntriesGql = /* GraphQL */ `
  query {
    labor_rights {
      id
      title
      coverUrl
    }
  }
`;

export const getMenuEntries = () =>
  graphqlClient({
    query: getMenuEntriesGql,
  }).then(data => data.labor_rights);

const getEntryGql = /* GraphQL */ `
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

export const getEntry = ({ entryId }) =>
  graphqlClient({
    query: getEntryGql,
    variables: {
      id: entryId,
    },
  }).then(data => data.labor_right);
