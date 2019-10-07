import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const data = [
  { salary: '4萬~5萬', count: 10 },
  { salary: '5萬~6萬', count: 20 },
  { salary: '5萬~6萬', count: 10 },
  { salary: '7萬以上', count: 3 },
];

const CompanyDistributionChart = () => (
  <BarChart
    width={494}
    height={233}
    data={data}
    margin={{ left: -30, bottom: -25 }}
  >
    <XAxis type="category" dataKey="salary" label="月薪" height={70} />
    <YAxis type="number" label="人數" width={100} />
    <Bar dataKey="count" fill="#fcd406" />
  </BarChart>
);

export default CompanyDistributionChart;
