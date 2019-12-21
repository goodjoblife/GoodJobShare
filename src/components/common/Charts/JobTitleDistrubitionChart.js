import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import R from 'ramda';
import { useWindowSize } from 'react-use';
import breakpoints from '../../../constants/breakpoints';

const maxNameLength = R.pipe(
  R.map(
    R.pipe(
      R.path(['job_title', 'name']),
      R.length,
    ),
  ),
  R.reduce(R.max, -Infinity),
);

const YAxisTickFormatter = (str, perNWord = 4) => {
  let newStr = '';
  let count = 0;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    if (char === ' ') {
      newStr += char;
      count = 0;
    } else {
      if (count === perNWord) {
        newStr += ' ';
        newStr = newStr + char;
        count = 1;
      } else {
        newStr = newStr + char;
        count += 1;
      }
    }
  }
  return newStr;
};

const JobTitleDistributionChart = ({ data }) => {
  const { width } = useWindowSize();

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          left: width < breakpoints.xs ? null : maxNameLength(data) * 10,
          bottom: -25,
        }}
      >
        <XAxis type="number" label="平均月薪" height={70} />
        <YAxis
          type="category"
          dataKey="job_title.name"
          tickFormatter={width < breakpoints.xs ? YAxisTickFormatter : null}
          tick={{ fontSize: width < breakpoints.xs ? '12px' : null }}
        />
        <Bar dataKey="average_salary.amount" fill="#fcd406" />
      </BarChart>
    </ResponsiveContainer>
  );
};

JobTitleDistributionChart.propTypes = {
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
};

export default JobTitleDistributionChart;
