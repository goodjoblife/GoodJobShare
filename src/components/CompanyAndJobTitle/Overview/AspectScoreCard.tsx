import React from 'react';
import { generatePath } from 'react-router';

import { Aspect, aspectTranslation } from 'constants/companyJobTitle';
import useCompanyName from 'pages/Company/useCompanyName';
import { companyWorkExperiencesAspectPath } from 'constants/linkTo';
import ScoreCard from './ScoreCard';

interface AspectScoreCardProps {
  aspect: Aspect;
  averageRating: number;
  ratingCount: number;
}

const AspectScoreCard: React.FC<AspectScoreCardProps> = ({
  aspect,
  averageRating,
  ratingCount,
}) => {
  const companyName = useCompanyName();
  const path = generatePath(companyWorkExperiencesAspectPath, {
    companyName,
    aspect,
  });

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
