import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const data = [
  { name: '軟體工程師', salary: 60000 },
  { name: '行銷企劃', salary: 40000 },
  { name: 'UI/UX 設計師', salary: 40000 },
  { name: 'PM', salary: 50000 },
];

const JobTitleDistributionChart = () => (
  <BarChart
    width={494}
    height={233}
    data={data}
    layout="vertical"
    margin={{ left: 50, bottom: -25 }}
  >
    <XAxis type="number" label="平均月薪" height={70} />
    <YAxis type="category" dataKey="name" />
    <Bar dataKey="salary" fill="#fcd406" />
  </BarChart>
);

export default JobTitleDistributionChart;
