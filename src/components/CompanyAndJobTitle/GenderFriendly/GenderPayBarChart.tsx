import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

export type GenderPayItem = {
  jobTitle: string;
  femaleAvg: number;
  maleAvg: number;
};

const BAR_SIZE = 20;
const BAR_GAP = 4;
const CATEGORY_GAP = 24;

const formatWage = (v: number): string => v.toLocaleString();

type BarLabelProps = {
  x?: number;
  y?: number;
  height?: number;
};

const renderInsideLabel = (text: string) => ({
  x = 0,
  y = 0,
  height = 0,
}: BarLabelProps): React.ReactElement<SVGElement> => (
  <text x={x + 8} y={y + height / 2} dy={4} fill="#333" fontSize={13}>
    {text}
  </text>
);

type Props = {
  items: GenderPayItem[];
};

const GenderPayBarChart: React.FC<Props> = ({ items }) => {
  const chartHeight =
    items.length * (BAR_SIZE * 2 + BAR_GAP) +
    (items.length - 1) * CATEGORY_GAP +
    30;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={items}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 8 }}
        barGap={BAR_GAP}
        barCategoryGap={CATEGORY_GAP}
      >
        <CartesianGrid horizontal={false} stroke="#eee" />
        <XAxis
          type="number"
          tickFormatter={formatWage}
          tick={{ fill: '#969696', fontSize: '12px' }}
          axisLine={{ stroke: '#e0e0e0' }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="jobTitle"
          width={100}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#333', fontSize: '13px' }}
        />
        <Bar
          dataKey="femaleAvg"
          fill="#fcd406"
          barSize={BAR_SIZE}
          label={renderInsideLabel('女')}
        />
        <Bar
          dataKey="maleAvg"
          fill="#ffffff"
          stroke="#e0e0e0"
          barSize={BAR_SIZE}
          label={renderInsideLabel('男')}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GenderPayBarChart;
