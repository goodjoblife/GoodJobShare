import React from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

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
};

const PolicyBarChart: React.FC<PolicyBarChartProps> = ({ distribution }) => (
  <Card className={styles.card}>
    <div className={styles.title}>{distribution.title}</div>
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={distribution.items}
          layout="vertical"
          margin={{ right: 40, left: 8 }}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis
            type="category"
            dataKey="label"
            width={56}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#333', fontSize: '13px' }}
          />
          <Bar
            dataKey="percentage"
            fill="#fcd406"
            barSize={10}
            minPointSize={1}
          >
            <LabelList
              dataKey="percentage"
              position="right"
              formatter={(v: number): string => `${v}%`}
              style={{ fill: '#333', fontSize: '13px' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.footer}>資料數：{distribution.dataCount}</div>
  </Card>
);

export default PolicyBarChart;
