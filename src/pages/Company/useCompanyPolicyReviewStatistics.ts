import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryCompanyPolicyReviewStatistics } from 'actions/company';
import { PolicyReviewStatistics } from 'apis/queryCompanyPolicyReviewStatistics';
import { companyPolicyReviewStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

const useCompanyPolicyReviewStatistics = (
  companyName: string,
): PolicyReviewStatistics[] | null => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryCompanyPolicyReviewStatistics(companyName));
  }, [dispatch, companyName]);

  const box = useSelector(
    companyPolicyReviewStatisticsBoxSelectorByName(companyName),
  );
  return isFetched(box) ? box.data : null;
};

export default useCompanyPolicyReviewStatistics;
