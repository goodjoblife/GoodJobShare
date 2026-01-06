import React from 'react';
import { generatePath, useParams } from 'react-router';
import { Aspect } from 'constants/companyJobTitle';
import { companyNameSelector } from 'pages/Company/useCompanyName';
import { companyWorkExperiencesAspectPath } from 'constants/linkTo';

// Add necessary imports
import Card from 'common/Card';
import styles from './SummaryBlock.module.css';
import cn from 'classnames';
import AbstractView from './AverageWeekWorkTimeView';

// Props interface for ScoreCard
export interface ScoreCardProps {
  title: string;
  value: number;
  maxValue: number;
  linkTo: string;
  dataCount: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  value,
  maxValue,
  linkTo,
  dataCount,
}) => (
  <Card className={cn(styles.card, styles.averageWeekWorkTime)}>
    <AbstractView
      title={title}
      value={value.toFixed(1)}
      valueSuffix={`/ ${maxValue.toFixed(1)}`}
      linkTo={linkTo}
      footer={`查看 ${dataCount} 筆資料>>`}
    />
  </Card>
);

export default ScoreCard;

export const WorkLifeBalanceCard: React.FC = () => {
  const params = useParams<string>();
  const companyName = companyNameSelector(params);
  const path = generatePath(companyWorkExperiencesAspectPath, {
    companyName,
    aspect: Aspect.WORK_LIFE_BALANCE,
  });
  // TODO: Integrate with API
  return (
    <ScoreCard
      title="工作與生活平衡"
      value={3.7}
      maxValue={5}
      linkTo={path}
      dataCount={100}
    />
  );
};

export const GenderScoreCard: React.FC = () => {
  const params = useParams<string>();
  const companyName = companyNameSelector(params);
  const path = generatePath(companyWorkExperiencesAspectPath, {
    companyName,
    aspect: Aspect.GENDER,
  });
  // TODO: Integrate with API
  return (
    <ScoreCard
      title="性別友善度"
      value={3.7}
      maxValue={5}
      dataCount={100}
      linkTo={path}
    />
  );
};
