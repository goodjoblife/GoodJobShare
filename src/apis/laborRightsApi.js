import fetchUtil from 'utils/fetchUtil';

import { CONTENTFUL_API_HOST } from '../config';

const fetchLaborRightsMetaList = () => fetchUtil('/entries', CONTENTFUL_API_HOST)('GET');

export default fetchLaborRightsMetaList;

export const getEntries = () => fetchUtil('/entries', CONTENTFUL_API_HOST)('GET');

export const getEntry = entryId => fetchUtil(`/entries/${entryId}`, CONTENTFUL_API_HOST)('GET');
