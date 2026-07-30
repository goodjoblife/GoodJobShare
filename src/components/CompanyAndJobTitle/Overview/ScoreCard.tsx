import cn from 'classnames';
import { LocationDescriptor } from 'history';
import React from 'react';

import ButtonImpl from 'common/button/Button';
import Card from 'common/Card';
import { generateSharePolicyForm } from 'common/ShareExpSection/shareLinkTo';

import AbstractView from './AbstractView';
import emptyDataAspectImage from './empty_data_aspect.svg';
import styles from './SummaryBlock.module.css';

type ButtonProps = {
  circleSize?: string;
  btnStyle?: string;
  to?: LocationDescriptor;
  children?: React.ReactNode;
};
const Button = ButtonImpl as React.FC<ButtonProps>;

export interface ScoreCardProps {
  title: string;
  value: number;
  maxValue: number;
  linkTo: string;
  dataCount: number;
  hasEmptyState?: boolean;
}

const EmptyScoreCard: React.FC<{ title: string }> = ({ title }) => (
  <Card className={cn(styles.card, styles.scoreCard, styles.emptyScoreCard)}>
    <span className={styles.emptyScoreCardTitle}>{title}</span>
    <img
      className={styles.emptyScoreCardImage}
      src={emptyDataAspectImage}
      alt="資料不足"
    />
    <span className={styles.emptyScoreCardText}>資料不足</span>
    <Button circleSize="lg" btnStyle="yellow" to={generateSharePolicyForm()}>
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
  hasEmptyState,
}) => {
  if (dataCount === 0) {
    return hasEmptyState ? <EmptyScoreCard title={title} /> : null;
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
