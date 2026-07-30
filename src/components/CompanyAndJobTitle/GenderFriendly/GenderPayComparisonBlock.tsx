import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import Card from 'common/Card';

import styles from './GenderPayComparisonBlock.module.css';

export type GenderPayItem = {
  jobTitle: string;
  femaleAvg: number;
  maleAvg: number;
};

export type GenderPayComparisonData = {
  jobTitlePayItems: GenderPayItem[];
};

type Props = {
  data: GenderPayComparisonData;
};

const GenderPayComparisonBlock: React.FC<Props> = ({ data }) => (
  <Card className={styles.card}>
    <ResponsiveContainer
      width="100%"
      height={data.jobTitlePayItems.length * 70 + 60}
    >
      <BarChart
        data={data.jobTitlePayItems}
        layout="vertical"
        margin={{ right: 20, left: 16 }}
        barCategoryGap="30%"
      >
        <XAxis
          type="number"
          tickFormatter={(v: number): string => `${v / 1000}K`}
        />
        <YAxis
          type="category"
          dataKey="jobTitle"
          width={100}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#333', fontSize: '13px' }}
        />
        <Legend
          verticalAlign="bottom"
          formatter={(v: string): string => (v === 'femaleAvg' ? '女' : '男')}
        />
        <Bar dataKey="femaleAvg" name="femaleAvg" fill="#fcd406" barSize={10} />
        <Bar dataKey="maleAvg" name="maleAvg" fill="#e0e0e0" barSize={10} />
      </BarChart>
    </ResponsiveContainer>
    <div className={styles.footer}>平均月薪</div>
  </Card>
);

export default GenderPayComparisonBlock;
