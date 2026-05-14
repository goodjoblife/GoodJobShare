import React from 'react';
import { generatePath } from 'react-router';

import { Aspect } from 'constants/companyJobTitle';
import useCompanyName from 'pages/Company/useCompanyName';
import { companyWorkExperiencesAspectPath } from 'constants/linkTo';
import ScoreCard from './ScoreCard';

import { useSelector } from 'react-redux';
import { companyWorkExperiencesAspectStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';
import { AspectRatingStatistics } from 'apis/aspectRatingStatistics';

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

export const useAspectsData = (aspects: Aspect[]): AspectRatingStatistics[] => {
  const companyName = useCompanyName();
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
