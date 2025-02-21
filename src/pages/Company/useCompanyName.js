import R from 'ramda';
import { useParams } from 'react-router-dom';

export const companyNameSelector = R.compose(
  decodeURIComponent,
  params => params.companyName,
);

const useCompanyName = () => {
  const params = useParams();
  return companyNameSelector(params);
};

export default useCompanyName;
