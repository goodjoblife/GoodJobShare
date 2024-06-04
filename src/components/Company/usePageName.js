import R from 'ramda';
import { useParams } from 'react-router-dom';

export const pageNameSelector = R.compose(
  decodeURIComponent,
  params => params.companyName,
);

export const usePageName = () => {
  const params = useParams();
  return pageNameSelector(params);
};
