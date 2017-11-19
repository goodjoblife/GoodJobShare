import qs from 'qs';
import R from 'ramda';

import fetchUtil from 'utils/fetchUtil';

const endpoint = '/experiences';

const getEndpoint = ({ id, limit = 3 }) => `${endpoint}/${id}/recommended?limit=${limit}`;
const fetch = ({ id, limit }) => fetchUtil(getEndpoint({ id, limit }));

export const getExperiencesRecommended = ({ id, limit }) => fetch({ id, limit })('get');

export const getExperiences = ({
  start,
  limit,
  searchBy,
  searchQuery,
  sort,
  searchType,
}) => {
  const queryObj = {
    start,
    limit,
    search_by: searchBy,
    search_query: searchQuery,
    sort,
    type: R.join(',', searchType),
  };
  const queryString = qs.stringify(queryObj);

  const url = queryString ? `${endpoint}?${queryString}` : `${endpoint}`;

  return fetchUtil(url)('GET');
};
