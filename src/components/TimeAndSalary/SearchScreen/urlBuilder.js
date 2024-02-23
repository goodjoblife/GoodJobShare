import qs from 'qs';
import { generatePath } from 'react-router';

// TODO: 將相似的 url builder 整合在一起
export const companyPageOverview = (company, page, otherQuery) =>
  `${generatePath('/companies/:company/overview', { company })}${qs.stringify(
    { ...otherQuery, p: 1 },
    { addQueryPrefix: true },
  )}`;

export const jobTitlePageOverview = (jobTitle, page, otherQuery) =>
  `${generatePath('/job-titles/:jobTitle/overview', {
    jobTitle,
  })}${qs.stringify({ ...otherQuery, p: 1 }, { addQueryPrefix: true })}`;
