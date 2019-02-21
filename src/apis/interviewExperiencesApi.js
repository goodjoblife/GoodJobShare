import fetchUtil from 'utils/fetchUtil';

const endpoint = '/interview_experiences';
const fetch = fetchUtil(endpoint);

export const postInterviewExperience = ({ body, token }) =>
  fetch.post({ body, token });

export default {
  postInterviewExperience,
};
