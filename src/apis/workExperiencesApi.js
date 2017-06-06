import fetchUtil from 'utils/fetchUtil';

const endpoint = '/work_experiences';
const fetch = fetchUtil(endpoint);

export const postWorkExperience = body => fetch('post', body);
export const foo = 1;
