import fetchUtil from 'utils/fetchUtil';

import { CONTENTFUL_API_HOST } from '../config';

export const getEntries = () =>
  fetchUtil('/entries', { apiHost: CONTENTFUL_API_HOST })('GET');

export const getEntry = ({ entryId }) =>
  fetchUtil(`/entries/${entryId}`, { apiHost: CONTENTFUL_API_HOST })('GET');

export default {
  getEntries,
  getEntry,
};
