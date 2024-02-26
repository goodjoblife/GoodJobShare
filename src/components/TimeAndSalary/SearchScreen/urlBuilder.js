import qs from 'qs';
import { generatePath } from 'react-router';

// TODO: 將相似的 url builder 整合在一起
export const companyPageOverview = (company, page, otherQuery) => {
  const path = generatePath('/companies/:company/overview', { company });
  const search = qs.stringify(
    { ...otherQuery, p: 1 },
    { addQueryPrefix: true },
  );
  return `${path}${search}`;
};

export const jobTitlePageOverview = (jobTitle, page, otherQuery) => {
  const path = generatePath('/job-titles/:jobTitle/overview', { jobTitle });
  const search = qs.stringify(
    { ...otherQuery, p: 1 },
    { addQueryPrefix: true },
  );
  return `${path}${search}`;
};
