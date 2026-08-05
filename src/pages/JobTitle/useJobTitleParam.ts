import { useParams } from 'react-router-dom';

// Matches the React Router route params for JobTitle pages.
// jobTitle 標成 optional：useParams 在非職稱頁的路由一樣會回傳物件，
// 少了這個 param 時 decodeURIComponent(undefined) 會得到字串 "undefined"，
// 靜靜地被當成職稱往下傳（redux key、generatePath）。改為明確擋下，
// 讓「不在 /job-titles/:jobTitle 之下」的誤用當場失敗而非默默出錯。
type Params = { jobTitle?: string };

const decodeJobTitle = (jobTitle: string | undefined): string => {
  if (jobTitle === undefined) {
    throw new Error(
      'jobTitle 不存在：useJobTitleParam / jobTitleSelector 只能用在 /job-titles/:jobTitle 之下',
    );
  }
  return decodeURIComponent(jobTitle);
};

export const jobTitleSelector = (params: Params): string =>
  decodeJobTitle(params.jobTitle);

// 名字帶 Param 的理由見 pages/Company/useCompanyNameParam
const useJobTitleParam = (): string => jobTitleSelector(useParams<Params>());

export default useJobTitleParam;
