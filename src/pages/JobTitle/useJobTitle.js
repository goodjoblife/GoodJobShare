import R from 'ramda';
import { useParams } from 'react-router-dom';

export const jobTitleSelector = R.compose(
  decodeURIComponent,
  params => params.jobTitle,
);

const useJobTitle = () => {
  const params = useParams();
  return jobTitleSelector(params);
};

export default useJobTitle;
