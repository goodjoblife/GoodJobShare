import React from 'react';
import cn from 'classnames';

import Card from 'common/Card';
import styles from './SummaryBlock.module.css';
import AbstractView from './AbstractView';

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
};

export default ScoreCard;
