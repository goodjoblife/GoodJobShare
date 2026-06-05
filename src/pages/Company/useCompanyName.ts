import { useParams } from 'react-router-dom';

// Matches the React Router route params for Company pages
type Params = { companyName: string };

export const companyNameSelector = (params: Params): string =>
  decodeURIComponent(params.companyName);

const useCompanyName = (): string => {
  const params = useParams<Params>();
  return companyNameSelector(params);
};

export default useCompanyName;
