import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const BarChartView = ({ data }) => (
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

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      salary: PropTypes.number,
    }),
  ).isRequired,
};

export default BarChartView;
