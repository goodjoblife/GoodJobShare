import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { EsgYearStatistics } from 'utils/esgYearUtils';
import FetchBox, { mapBox } from 'utils/fetchBox';

export const useEsgYearStatisticsBox = (
  companyName: string,
  year?: number,
): FetchBox<EsgYearStatistics | null> => {
  const selector = useMemo(
    () => companyEsgSalaryDataBoxSelectorByName(companyName),
    [companyName],
  );
  const box = useSelector(selector);

  return useMemo(
    () =>
      mapBox(box, list => {
        if (!list) return null;
        if (year === undefined) return list[0] || null;
        return list.find(item => item.year === year) || list[0] || null;
      }),
    [box, year],
  );
};

export default useEsgYearStatisticsBox;
