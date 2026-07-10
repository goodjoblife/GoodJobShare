import React from 'react';
import { useSelector } from 'react-redux';
import { generatePath } from 'react-router';

import { AspectRatingStatistics } from 'apis/aspectRatingStatistics';
import { Aspect } from 'constants/companyJobTitle';
import { companyWorkExperiencesAspectPath } from 'constants/linkTo';
import useCompanyName from 'pages/Company/useCompanyName';
import { companyWorkExperiencesAspectStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

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

interface AspectScoreCardProps {
  aspect: Aspect;
}

const AspectScoreCard: React.FC<AspectScoreCardProps> = ({ aspect }) => {
  const companyName = useCompanyName();
  const path = generatePath(companyWorkExperiencesAspectPath, {
    companyName,
    aspect,
  });

  const data = useAspectData({ companyName, aspect });
  if (!data) return null;

  const { averageRating, ratingCount } = data;
  return (
    <ScoreCard
      title={aspect}
      value={averageRating}
      maxValue={5}
      linkTo={path}
      dataCount={ratingCount}
    />
  );
};

export default AspectScoreCard;
