import React from 'react';
import { Link } from 'react-router-dom';
import { formatSalaryAmount, formatSalaryType } from 'common/formatter';
import MagnifierPlus from 'common/icons/MagnifierPlus';
import employmentType from '../../../constants/employmentType';
import styles from './formatter.module.css';

export const getCompany = item => (
  <div>
    <Link
      to={`/companies/${encodeURIComponent(
        item.company.name,
      )}/salary-work-times`}
    >
      {item.company.name}
    </Link>
  </div>
);

export const getJobTitle = item => {
  const { job_title: jobTitle, sector } = item;
  return (
    <div>
      <Link
        to={`/job-titles/${encodeURIComponent(
          jobTitle.name,
        )}/salary-work-times`}
      >
        {jobTitle.name}
      </Link>{' '}
      <span className={`pM ${styles.sector}`}>{sector}</span>
    </div>
  );
};

export const getNameAsCompanyName = (o, row) => (
  <Link to={`/companies/${encodeURIComponent(o.name)}/salary-work-times`}>
    {o.name} <span className={`pM ${styles.sector}`}>{row.sector}</span>
  </Link>
);

export const getNameAsJobTitle = (o, row) => (
  <Link to={`/job-titles/${encodeURIComponent(o.name)}/salary-work-times`}>
    {o.name} <span className={`pM ${styles.sector}`}>{row.sector}</span>
  </Link>
);

export const getEmploymentType = type => (type ? employmentType[type] : '');

export const getWorkingHour = (val, row) => (
  <div>{`${val === undefined || val === null ? '-' : val} / ${
    row.day_real_work_time === undefined || row.day_real_work_time === null
      ? '-'
      : row.day_real_work_time
  }`}</div>
);

export const getYear = val => {
  if (typeof val === 'number') {
    if (!val) return '-';
    return `${Math.round(val)} 年`;
  }
  return '-';
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
      return styles.hardly;
    case 1:
      return styles.sometimes;
    case 2:
      return styles.usually;
    case 3:
      return styles.always;
    default:
      return styles.hardly;
  }
};

export const getFrequency = item => {
  const style = getFrequencyStyle(item);
  const text = getFrequencyText(item);
  return (
    <div>
      <div className={`${styles.dot} ${style}`} />
      {text}
    </div>
  );
};

export const getWeekWorkTime = item =>
  item.week_work_time ? (
    <div
      className={styles.bar}
      style={{
        width: `${item.week_work_time >= 100 ? 100 : item.week_work_time}%`,
      }}
    >
      {item.week_work_time}
    </div>
  ) : (
    '-'
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

export const getAboutThisJobButton = toggleAboutThisJobModal => d => {
  const aboutThisJob = d.about_this_job;
  if (!aboutThisJob) return null;

  const title = `${d.company.name} ${d.job_title.name}`;
  return (
    <div onClick={() => toggleAboutThisJobModal(aboutThisJob, title)}>
      <MagnifierPlus style={{ width: 23, height: 23 }} />
    </div>
  );
};
