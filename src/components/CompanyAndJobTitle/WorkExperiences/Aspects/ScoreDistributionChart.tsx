import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type ScoreDistribution = {
  count: number;
  rating: number;
};

type ScoreDistributionChartProps = {
  data: ScoreDistribution[];
};

const ScoreDistributionChart: React.FC<ScoreDistributionChartProps> = ({
  data,
}) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data} layout="vertical">
        <XAxis hide type="number" />
        <YAxis
          type="category"
          dataKey="rating"
          unit="分"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#333', fontSize: '12px' }}
        />
        <Bar
          dataKey="count"
          fill="#fcd406"
          barSize={8}
          label={{ fill: '#333', fontSize: '12px' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreDistributionChart;
