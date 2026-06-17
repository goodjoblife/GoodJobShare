import { useParams } from 'react-router-dom';

// Matches the React Router route params for JobTitle pages
type Params = { jobTitle: string };

export const jobTitleSelector = (params: Params): string =>
  decodeURIComponent(params.jobTitle);

const useJobTitle = (): string => {
  const params = useParams<Params>();
  return jobTitleSelector(params);
};

export default useJobTitle;
