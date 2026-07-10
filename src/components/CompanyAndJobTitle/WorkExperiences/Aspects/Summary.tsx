import loadable from '@loadable/component';
import React from 'react';

import { RatingBin } from 'apis/aspectRatingStatistics';
import Card from 'common/Card';
import Pen from 'common/icons/Pen';
import OverallRating from 'common/OverallRating';

import styles from './styles.module.css';

const ScoreDistributionChart = loadable(() =>
  import('./ScoreDistributionChart'),
);

type SummaryProps = {
  averageRating: number;
  ratingDistribution: RatingBin[];
  ratingCount: number;
  summary?: string;
};

const Summary: React.FC<SummaryProps> = ({
  averageRating,
  ratingDistribution,
  ratingCount,
  summary,
}) => {
  const distributionMap = new Map<number, number>(
    ratingDistribution.map((item: RatingBin) => [item.rating, item.count]),
  );

  const rows: RatingBin[] = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: distributionMap.get(rating) || 0,
  }));

  const totalCount =
    typeof ratingCount === 'number'
      ? ratingCount
      : rows.reduce((sum, { count }) => sum + count, 0);

  return (
    <Card className={styles.summary}>
      <div className={styles.header}>
        <div className={styles.scoreBlock}>
          <div className={styles.value}>{averageRating.toFixed(1)}</div>
          <OverallRating rating={averageRating} size="m" />
          <div className={styles.meta}>評分數：{totalCount}</div>
        </div>
        <div className={styles.distribution}>
          <div className={styles.scoreDistribution}>
            <ScoreDistributionChart data={rows} />
          </div>
        </div>
      </div>
      {summary && (
        <>
          <p className={styles.summaryText}>{summary}</p>
          <p className={styles.summaryNote}>
            <Pen /> 本段評論由 ChatGPT 總結共 {totalCount} 篇評論內容
          </p>
        </>
      )}
    </Card>
  );
};

export default Summary;
