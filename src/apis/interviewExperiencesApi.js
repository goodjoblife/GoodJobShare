import fetchUtil from 'utils/fetchUtil';

const endpoint = '/interview_experiences';
const fetch = fetchUtil(endpoint);

export const postInterviewExperience = ({ body }) => fetch.post({ body });

export default {
  postInterviewExperience, // TODO
};
