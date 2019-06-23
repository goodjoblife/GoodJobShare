import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';

import { CONTENTFUL_API_HOST } from '../config';

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

export const getEntry = ({ entryId }) =>
  fetchUtil(`/entries/${entryId}`).get({
    options: { apiHost: CONTENTFUL_API_HOST },
  });

export default {
  getMenuEntries,
  getEntry,
};
