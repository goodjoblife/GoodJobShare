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

const Y_AXIS_LABEL_FONT_SIZE = 14;
const Y_AXIS_LABEL_PADDING = 12;
const Y_AXIS_MIN_WIDTH = 56;
const Y_AXIS_MAX_WIDTH = 120;

// CJK/fullwidth characters render roughly as wide as they are tall; Latin
// letters, digits and punctuation are narrower. No canvas measurement here
// since this also renders on the server.
const estimateTextWidth = (text: string, fontSize: number): number =>
  Array.from(text).reduce(
    (width, char) =>
      width + (/[　-鿿＀-￯]/.test(char) ? fontSize : fontSize * 0.6),
    0,
  );

const computeYAxisWidth = (items: PolicyItem[]): number => {
  const longestLabelWidth = Math.max(
    0,
    ...items.map(item => estimateTextWidth(item.label, Y_AXIS_LABEL_FONT_SIZE)),
  );
  return Math.min(
    Y_AXIS_MAX_WIDTH,
    Math.max(
      Y_AXIS_MIN_WIDTH,
      Math.ceil(longestLabelWidth) + Y_AXIS_LABEL_PADDING,
    ),
  );
};

type PolicyBarChartProps = {
  distribution: PolicyDistribution;
};

const PolicyBarChart: React.FC<PolicyBarChartProps> = ({ distribution }) => {
  const chartHeight =
    distribution.items.length * BAR_SIZE +
    (distribution.items.length - 1) * BAR_CATEGORY_GAP;
  const yAxisWidth = computeYAxisWidth(distribution.items);

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
              width={yAxisWidth}
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
