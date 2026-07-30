import cn from 'classnames';
import React from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Link } from 'common/base';
import Card from 'common/Card';

import styles from './PolicyBarChart.module.css';

export type PolicyItem = {
  label: string;
  percentage: number;
};

export type PolicyDistribution = {
  title: string;
  dataCount: number;
  items: PolicyItem[];
};

type PolicyBarChartProps = {
  distribution: PolicyDistribution;
  linkTo?: string;
  titleAlign?: 'center' | 'left';
};

const PolicyBarChart: React.FC<PolicyBarChartProps> = ({
  distribution,
  linkTo,
  titleAlign = 'center',
}) => (
  <Card className={styles.card}>
    <div
      className={cn(styles.title, {
        [styles.titleLeft]: titleAlign === 'left',
      })}
    >
      {distribution.title}
    </div>
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={distribution.items}
          layout="vertical"
          margin={{ right: 40, left: 8 }}
          barCategoryGap={6}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis
            type="category"
            dataKey="label"
            width={56}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#333', fontSize: '14px' }}
          />
          <Bar
            dataKey="percentage"
            fill="#fcd406"
            barSize={20}
            minPointSize={1}
          >
            <LabelList
              dataKey="percentage"
              position="right"
              formatter={(v: number): string => `${v}%`}
              style={{ fill: '#333', fontSize: '14px' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
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

export default PolicyBarChart;
