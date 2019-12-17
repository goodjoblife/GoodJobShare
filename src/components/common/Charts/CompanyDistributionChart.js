import React from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const CompanyDistributionChart = ({ data }) => (
  <ResponsiveContainer>
    <BarChart data={data} margin={{ left: -30, bottom: -25 }}>
      <XAxis
        type="category"
        dataKey={({ range: { from, to } }) =>
          `${Math.floor(from / 10000)}萬~${Math.floor(to / 10000)}萬`
        }
        label="月薪"
        height={70}
      />
      <YAxis type="number" label="人數" width={100} />
      <Bar dataKey="data_count" fill="#fcd406" />
    </BarChart>
  </ResponsiveContainer>
);

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
