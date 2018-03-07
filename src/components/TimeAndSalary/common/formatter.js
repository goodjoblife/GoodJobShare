import React from 'react';
import { Link } from 'react-router-dom';

import {
  formatSalaryAmount,
  formatSalaryType,
} from 'common/formatter';

import commonStyles from '../views/view.module.css';

export const getCompany = item => (
  <div>
    <Link to={`/time-and-salary/company/${encodeURIComponent(item.company.name)}/work-time-dashboard`}>
      {item.company.name}
    </Link>
  </div>
);

export const getJobTitle = item => {
  const { job_title: jobTitle, sector } = item;
  return (
    <div>
      <Link to={`/time-and-salary/job-title/${encodeURIComponent(jobTitle)}/work-time-dashboard`}>
        {jobTitle}
      </Link>
      {' '}
      <span className={`pM ${commonStyles.sector}`}>
        {sector}
      </span>
    </div>
  );
};

const getFrequencyText = item => {
  switch (item.overtime_frequency) {
    case 0:
      return '幾乎不';
    case 1:
      return '偶爾';
    case 2:
      return '經常';
    case 3:
      return '幾乎每天';
    default:
      return '幾乎不';
  }
};

const getFrequencyStyle = item => {
  switch (item.overtime_frequency) {
    case 0:
      return commonStyles.hardly;
    case 1:
      return commonStyles.sometimes;
    case 2:
      return commonStyles.usually;
    case 3:
      return commonStyles.always;
    default:
      return commonStyles.hardly;
  }
};

export const getFrequency = item => {
  const style = getFrequencyStyle(item);
  const text = getFrequencyText(item);
  return (
    <div>
      <div className={`${commonStyles.dot} ${style}`} />
      {text}
    </div>
  );
};

export const getWeekWorkTime = item => (
  <div className={commonStyles.bar} style={{ width: `${item.week_work_time >= 100 ? 100 : item.week_work_time}%` }} >
    {item.week_work_time}
  </div>
);

export const getSalary = item => {
  if (!item.salary) {
    return '-';
  }

  const { amount, type } = item.salary;

  return `${formatSalaryAmount(amount)} / ${formatSalaryType(type)}`;
};

export const formatWage = wage => {
  if (typeof wage === 'number') {
    if (!wage) return '-';
    return `${Math.round(wage)} 元`;
  }
  return '';
};

export const formatDate = ({ year, month }) =>
  `${year}.${month >= 10 ? '' : 0}${month}`;
