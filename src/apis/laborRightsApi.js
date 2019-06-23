import graphqlClient from 'utils/graphqlClient';

const getMenuEntriesGql = `
  query {
    labor_rights {
      id
      title
      coverUrl
    }  
  }
`;

const getMenuEntries = () =>
  graphqlClient({
    query: getMenuEntriesGql,
  }).then(data => data.labor_rights);

const getEntryGql = `
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

export default {
  getMenuEntries,
  getEntry,
};
