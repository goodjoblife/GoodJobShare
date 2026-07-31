import cn from 'classnames';
import React from 'react';

import { Link } from 'common/base';
import Card from 'common/Card';

import PolicyBarChart, { PolicyDistribution } from './PolicyBarChart';
import styles from './PolicyChartCard.module.css';

type Props = {
  title: string;
  distribution: PolicyDistribution;
  linkTo?: string;
};

const PolicyChartCard: React.FC<Props> = ({ title, distribution, linkTo }) => (
  <Card className={styles.card}>
    <div className={styles.title}>{title}</div>
    <PolicyBarChart distribution={distribution} />
    {linkTo ? (
      <Link to={linkTo} className={cn(styles.footer, styles.footerLink)}>
        資料數：{distribution.dataCount}
      </Link>
    ) : (
      <div className={cn(styles.footer, styles.footerPlain)}>
        資料數：{distribution.dataCount}
      </div>
    )}
  </Card>
);

export default PolicyChartCard;
