import qs from 'qs';

// TODO: 將相似的 url builder 整合在一起
export const companyPageOverview = (company, page, otherQuery) =>
  `/companies/${encodeURIComponent(company)}/overview${qs.stringify(
    { ...otherQuery, p: 1 },
    { addQueryPrefix: true },
  )}`;

export const jobTitlePageOverview = (jobTitle, page, otherQuery) =>
  `/job-titles/${encodeURIComponent(jobTitle)}/overview${qs.stringify(
    { ...otherQuery, p: 1 },
    { addQueryPrefix: true },
  )}`;
