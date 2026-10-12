import { useSelector } from 'react-redux';

import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

import { FemaleManagerItem } from './GenderFriendly';

const useFemaleManagerStatisticsItem = (
  companyName: string,
): FemaleManagerItem | null => {
  const box = useSelector(companyEsgSalaryDataBoxSelectorByName(companyName));
  if (!isFetched(box) || !box.data || box.data.length === 0) return null;
  // ESG 資料依年份新到舊排序，第一筆即最新年度。
  return box.data[0].femaleManagerStatisticsItem;
};

export default useFemaleManagerStatisticsItem;
