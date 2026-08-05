import { LocationDescriptor } from 'history';
import React from 'react';
import { useSelector } from 'react-redux';
import { generatePath } from 'react-router';

import { AspectRatingStatistics } from 'apis/aspectRatingStatistics';
import { Aspect } from 'constants/companyJobTitle';
import { companyWorkExperiencesAspectPath } from 'constants/linkTo';
import { companyWorkExperiencesAspectStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

import { useCompanyName } from './PageContextProvider';
import ScoreCard from './ScoreCard';

const useAllAspectRatingStatistics = (
  companyName: string,
): AspectRatingStatistics[] => {
  const box = useSelector(
    companyWorkExperiencesAspectStatisticsBoxSelectorByName(companyName),
  );
  if (!isFetched(box) || !box.data) return [];
  return box.data.companyAspectRatingStatistics;
};

const useIsAspectStatisticsFetched = (companyName: string): boolean => {
  const box = useSelector(
    companyWorkExperiencesAspectStatisticsBoxSelectorByName(companyName),
  );
  return isFetched(box);
};

const useAspectData = ({
  companyName,
  aspect,
}: {
  companyName: string;
  aspect: Aspect;
}): AspectRatingStatistics | undefined => {
  const stats = useAllAspectRatingStatistics(companyName);
  return stats.find(item => item.aspect === aspect);
};

export const useAspectsData = (
  companyName: string,
  aspects: Aspect[],
): AspectRatingStatistics[] => {
  const stats = useAllAspectRatingStatistics(companyName);
  return stats.filter(
    stat => aspects.includes(stat.aspect as Aspect) && stat.ratingCount > 0,
  );
};

// 面向評分只存在於公司，因此本元件只在公司頁有意義：
// companyName 取自 PageContext，掛到職稱頁時 useCompanyName 會當場擋下
interface AspectScoreCardProps {
  aspect: Aspect;
  emptyShareLinkTo?: LocationDescriptor;
}

const AspectScoreCard: React.FC<AspectScoreCardProps> = ({
  aspect,
  emptyShareLinkTo,
}) => {
  const companyName = useCompanyName();
  const path = generatePath(companyWorkExperiencesAspectPath, {
    companyName,
    aspect,
  });

  const isFetched = useIsAspectStatisticsFetched(companyName);
  const data = useAspectData({ companyName, aspect });
  if (!isFetched) return null;
  if (!data && !emptyShareLinkTo) return null;

  const { averageRating, ratingCount } = data || {
    averageRating: 0,
    ratingCount: 0,
  };
  return (
    <ScoreCard
      title={aspect}
      value={averageRating}
      maxValue={5}
      linkTo={path}
      dataCount={ratingCount}
      emptyShareLinkTo={emptyShareLinkTo}
    />
  );
};

export default AspectScoreCard;
