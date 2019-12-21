import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'react-use';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import breakpoints from '../../../constants/breakpoints';

const CustomizedLabel = ({ viewBox: { x, y, width, height } }) => {
  return (
    <g transform={`translate(${x + width / 2},${y + height - 20})`}>
      <text x={0} y={0} dy={16} fill="#000">
        <tspan textAnchor="middle" x="0">
          月薪
        </tspan>
      </text>
    </g>
  );
};

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  const [from, to] = payload.value.split('~');
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill="#666">
        <tspan textAnchor="middle" x="0">
          {from}~
        </tspan>
        <tspan textAnchor="middle" x="0" dy="20">
          {to}
        </tspan>
      </text>
    </g>
  );
};

const CompanyDistributionChart = ({ data }) => {
  const { width } = useWindowSize();
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{ left: -30, bottom: width < breakpoints.xs ? 0 : -25 }}
      >
        <XAxis
          type="category"
          dataKey={({ range: { from, to } }) =>
            `${Math.floor(from / 1000) / 10}萬~${Math.floor(to / 1000) / 10}萬`
          }
          label={width < breakpoints.xs ? <CustomizedLabel /> : '月薪'}
          height={70}
          tick={width < breakpoints.xs ? <CustomizedAxisTick /> : {}}
          interval={0}
        />
        <YAxis type="number" label="人數" width={100} />
        <Bar dataKey="data_count" fill="#fcd406" />
      </BarChart>
    </ResponsiveContainer>
  );
};

CompanyDistributionChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data_count: PropTypes.number,
      range: PropTypes.shape({
        from: PropTypes.number,
        to: PropTypes.number,
        type: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default CompanyDistributionChart;
