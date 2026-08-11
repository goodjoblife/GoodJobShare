import cn from 'classnames';
import { LocationDescriptor } from 'history';
import React from 'react';

import Button from 'common/button/Button';
import Card from 'common/Card';

import AbstractView from './AbstractView';
import emptyDataAspectImage from './empty_data_aspect.svg';
import styles from './ScoreCard.module.css';

export interface ScoreCardProps {
  title: string;
  value: number;
  maxValue: number;
  linkTo: string;
  dataCount: number;
  emptyShareLinkTo?: LocationDescriptor;
}

const EmptyScoreCard: React.FC<{
  title: string;
  shareLinkTo: LocationDescriptor;
}> = ({ title, shareLinkTo }) => (
  <Card className={cn(styles.card, styles.scoreCard, styles.emptyScoreCard)}>
    <span className={styles.emptyScoreCardTitle}>{title}</span>
    <img
      className={styles.emptyScoreCardImage}
      src={emptyDataAspectImage}
      alt="資料不足"
    />
    <span className={styles.emptyScoreCardText}>資料不足</span>
    <Button circleSize="lg" btnStyle="yellow" to={shareLinkTo}>
      立即分享
    </Button>
  </Card>
);

const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  value,
  maxValue,
  linkTo,
  dataCount,
  emptyShareLinkTo,
}) => {
  if (dataCount === 0) {
    return emptyShareLinkTo ? (
      <EmptyScoreCard title={title} shareLinkTo={emptyShareLinkTo} />
    ) : null;
  }
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
