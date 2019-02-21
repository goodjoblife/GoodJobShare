import fetchUtil from 'utils/fetchUtil';

const endpoint = '/work_experiences';
const fetch = fetchUtil(endpoint);

export const postWorkExperience = ({ body, token }) =>
  fetch.post({ body, token });

export default {
  postWorkExperience,
};
