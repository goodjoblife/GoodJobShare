import React from 'react';
import Card from 'common/Card';
import styles from './FemaleManagerCard.module.css';

type Props = {
  item: {
    year: number;
    percentage: number;
  };
};

const FemaleManagerCard: React.FC<Props> = ({ item }) => (
  <Card className={styles.card}>
    <div className={styles.badge}>{item.year} 年</div>
    <div className={styles.title}>管理職女性主管佔比</div>
    <div className={styles.data}>
      <span className={styles.value}>{(item.percentage * 100).toFixed(1)}</span>{' '}
      %
    </div>
  </Card>
);

export default FemaleManagerCard;
