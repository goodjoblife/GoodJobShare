import React from 'react';

import Card from 'common/Card';

import GenderPayBarChart, { GenderPayItem } from './GenderPayBarChart';
import styles from './GenderPayComparisonCard.module.css';

export type GenderPayComparisonData = {
  jobTitlePayItems: GenderPayItem[];
};

type Props = {
  data: GenderPayComparisonData;
};

const GenderPayComparisonCard: React.FC<Props> = ({ data }) => (
  <Card className={styles.card}>
    <GenderPayBarChart items={data.jobTitlePayItems} />
    <div className={styles.footer}>平均月薪</div>
  </Card>
);

export default GenderPayComparisonCard;
