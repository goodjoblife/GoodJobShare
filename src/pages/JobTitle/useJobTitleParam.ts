import { useParams } from 'react-router-dom';

// Matches the React Router route params for JobTitle pages
type Params = { jobTitle: string };

export const jobTitleSelector = (params: Params): string =>
  decodeURIComponent(params.jobTitle);

// 名字帶 Param 的理由見 pages/Company/useCompanyNameParam
const useJobTitleParam = (): string => {
  const params = useParams<Params>();
  return jobTitleSelector(params);
};

export default useJobTitleParam;
