import fetchUtil from 'utils/fetchUtil';

const getEndpoint = id => `/experiences/${id}/reports`;
const fetch = id => fetchUtil(getEndpoint(id));

export const postExperienceReport = ({ id, body, token }) =>
  fetch(id).post({ body, token });
