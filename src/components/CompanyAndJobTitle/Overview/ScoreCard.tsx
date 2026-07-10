import cn from 'classnames';
import React from 'react';

import Card from 'common/Card';

import AbstractView from './AbstractView';
import styles from './SummaryBlock.module.css';

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
}) => {
  if (dataCount === 0) return null;
  return (
    <Card className={cn(styles.card, styles.scoreCard)}>
      <AbstractView
        title={title}
        value={value.toFixed(1)}
        valueSuffix={`/ ${maxValue.toFixed(1)}`}
        linkTo={linkTo}
        footer={`查看 ${dataCount} 筆資料>>`}
      />
    </Card>
  );
};

export default ScoreCard;
