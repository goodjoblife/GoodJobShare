import React from 'react';
import ProgressBar from 'common/ProgressBar';
import { goalNum } from '../../../constants/dataProgress';
import { useExperienceCount } from 'hooks/useCount';

const ProgressBarWithDataCount = props => {
  const experienceCount = useExperienceCount();

  return <ProgressBar dataNum={experienceCount} goalNum={goalNum} {...props} />;
};

export default ProgressBarWithDataCount;
