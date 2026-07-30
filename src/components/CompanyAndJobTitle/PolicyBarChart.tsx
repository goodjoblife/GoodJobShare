import React from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import styles from './PolicyBarChart.module.css';

export type PolicyItem = {
  label: string;
  percentage: number;
};

export type PolicyDistribution = {
  dataCount: number;
  items: PolicyItem[];
};

const BAR_SIZE = 20;
const BAR_CATEGORY_GAP = 6;

type PolicyBarChartProps = {
  distribution: PolicyDistribution;
};

const PolicyBarChart: React.FC<PolicyBarChartProps> = ({ distribution }) => {
  const chartHeight =
    distribution.items.length * BAR_SIZE +
    (distribution.items.length - 1) * BAR_CATEGORY_GAP;

  return (
    <div className={styles.chart}>
      <div className={styles.chartContent}>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={distribution.items}
            layout="vertical"
            margin={{ right: 40, left: 8 }}
            barCategoryGap={BAR_CATEGORY_GAP}
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
              barSize={BAR_SIZE}
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
    </div>
  );
};

export default PolicyBarChart;
