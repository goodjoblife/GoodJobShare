import React from 'react';
import { useSelector } from 'react-redux';

import {
  Aspect,
  aspectTranslation,
  generateAspectURL,
} from 'constants/companyJobTitle';
import { AspectRatingStatisticsInIndex } from 'reducers/companyIndex';
import { companyWorkExperiencesAspectStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

import { useCompanyName } from './PageContextProvider';
import ScoreCard from './ScoreCard';

const useAllAspectRatingStatistics = (
  companyName: string,
): AspectRatingStatisticsInIndex[] => {
  const box = useSelector(
    companyWorkExperiencesAspectStatisticsBoxSelectorByName(companyName),
  );
  if (!isFetched(box) || !box.data) return [];
  return box.data.companyAspectRatingStatistics;
};

const useAspectData = ({
  companyName,
  aspect,
}: {
  companyName: string;
  aspect: Aspect;
}): AspectRatingStatisticsInIndex | undefined => {
  const stats = useAllAspectRatingStatistics(companyName);
  return stats.find(item => item.aspect === aspect);
};

export const useAspectsData = (
  companyName: string,
  aspects: Aspect[],
): AspectRatingStatisticsInIndex[] => {
  const stats = useAllAspectRatingStatistics(companyName);
  return stats.filter(
    stat => aspects.includes(stat.aspect) && stat.ratingCount > 0,
  );
};

// 面向評分只存在於公司，因此本元件只在公司頁有意義：
// companyName 取自 PageContext，掛到職稱頁時 useCompanyName 會當場擋下
interface AspectScoreCardProps {
  aspect: Aspect;
}

const AspectScoreCard: React.FC<AspectScoreCardProps> = ({ aspect }) => {
  const companyName = useCompanyName();
  const path = generateAspectURL({ pageName: companyName, aspect });

  const data = useAspectData({ companyName, aspect });
  if (!data) return null;

  const { averageRating, ratingCount } = data;
  return (
    <ScoreCard
      title={aspectTranslation[aspect]}
      value={averageRating}
      maxValue={5}
      linkTo={path}
      dataCount={ratingCount}
    />
  );
};

export default AspectScoreCard;
