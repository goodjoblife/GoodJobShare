import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import useEsgYearStatistics, {
  EsgYearStatistics,
} from 'hooks/useEsgYearStatistics';
import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  isError,
  isFetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';

export const useEsgYearStatisticsBox = (
  companyName: string,
  year?: number,
): FetchBox<EsgYearStatistics | null> => {
  const selector = useMemo(
    () => companyEsgSalaryDataBoxSelectorByName(companyName),
    [companyName],
  );
  const box = useSelector(selector);
  const esgYearStatistics = useEsgYearStatistics(box.data || null, year);

  return useMemo(() => {
    if (isFetched(box)) {
      return getFetched(box.data === null ? null : esgYearStatistics);
    }
    if (isError(box)) {
      return getError(box.error);
    }
    if (isFetching(box)) {
      return toFetching();
    }
    return getUnfetched();
  }, [box, esgYearStatistics]);
};

export default useEsgYearStatisticsBox;
