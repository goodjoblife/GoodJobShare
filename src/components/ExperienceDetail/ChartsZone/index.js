import React, { useState, useEffect } from 'react';
import R from 'ramda';
import { generatePath } from 'react-router';
import ChartWrapper from '../../LandingPage/ChartWrapper';
import SalaryDistributionChart from '../../common/Charts/SalaryDistributionChart';
import JobTitleDistributionChart from '../../common/Charts/JobTitleDistrubitionChart';
import { getCompany } from '../../../apis/company';
import { getJobTitle } from '../../../apis/jobTitle';
import styles from '../../LandingPage/SummarySection.module.css';

const selectJobAverageSalaries = R.compose(
  R.defaultTo([]),
  R.path(['salary_work_time_statistics', 'job_average_salaries']),
);
const selectSalaryDistributionBins = R.compose(
  R.defaultTo([]),
  R.path(['salary_distribution', 'bins']),
);

const ChartsZone = ({ companyName, jobTitle }) => {
  const [searchedCompany, setSearchedCompany] = useState([]);
  const [searchedJobTitle, setSearchedJobTitle] = useState([]);

  useEffect(() => {
    getCompany(companyName).then(setSearchedCompany);
    getJobTitle(jobTitle).then(setSearchedJobTitle);
  }, [companyName, jobTitle]);

  return (
    <div className={styles.page}>
      <ChartWrapper
        className={styles.chartWrapper}
        title={`${companyName}的薪水`}
        to={generatePath('/companies/:companyName', { companyName })}
      >
        <React.Fragment>
          <div className={styles.barChart}>
            <JobTitleDistributionChart
              data={selectJobAverageSalaries(searchedCompany)}
            />
          </div>
        </React.Fragment>
      </ChartWrapper>
      <ChartWrapper
        className={styles.chartWrapper}
        title={`${jobTitle}的薪水分佈`}
        to={generatePath('/job-titles/:jobTitle', { jobTitle })}
      >
        <React.Fragment>
          <div className={styles.barChart}>
            <SalaryDistributionChart
              data={selectSalaryDistributionBins(searchedJobTitle)}
            />
          </div>
        </React.Fragment>
      </ChartWrapper>
    </div>
  );
};

export default ChartsZone;
