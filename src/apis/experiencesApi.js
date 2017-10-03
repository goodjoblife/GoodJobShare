import fetchUtil from 'utils/fetchUtil';

const getEndpoint = ({ id, limit = 3 }) => `/experiences/${id}/recommended?limit=${limit}`;
const fetch = ({ id, limit }) => fetchUtil(getEndpoint({ id, limit }));

export const getExperiencesRecommended = ({ id, limit }) => fetch({ id, limit })('get');
export const foo = 1;
