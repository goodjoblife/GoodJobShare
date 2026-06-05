import { useParams } from 'react-router-dom';

type Params = { companyName: string };

export const companyNameSelector = (params: Params): string =>
  decodeURIComponent(params.companyName);

const useCompanyName = (): string => {
  const params = useParams<Params>();
  return companyNameSelector(params);
};

export default useCompanyName;
