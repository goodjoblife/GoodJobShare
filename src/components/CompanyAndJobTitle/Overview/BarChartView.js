import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const BarChartView = ({ data, width = 494, height = 233 }) => (
  <BarChart
    width={width}
    height={height}
    data={data}
    layout="vertical"
    margin={{ left: 50, bottom: -25 }}
  >
    <XAxis type="number" label="平均月薪" height={70} />
    <YAxis type="category" dataKey="job_title.name" />
    <Bar dataKey="average_salary.amount" fill="#fcd406" />
  </BarChart>
);

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      job_title: PropTypes.shape({
        name: PropTypes.string,
      }),
      average_salary: PropTypes.shape({
        amount: PropTypes.number,
      }),
    }),
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default BarChartView;
