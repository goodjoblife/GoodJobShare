import fetchUtil from 'utils/fetchUtil';

import { CONTENTFUL_API_HOST } from '../config';

export const getEntries = () =>
  fetchUtil('/entries').get({ options: { apiHost: CONTENTFUL_API_HOST } });

export const getEntry = ({ entryId }) =>
  fetchUtil(`/entries/${entryId}`).get({
    options: { apiHost: CONTENTFUL_API_HOST },
  });

export default {
  getEntries,
  getEntry,
};
