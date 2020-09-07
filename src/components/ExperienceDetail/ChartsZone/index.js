import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import cn from 'classnames';
import { generatePath } from 'react-router';
import ChartWrapper from '../../LandingPage/ChartWrapper';
import SalaryDistributionChart from '../../common/Charts/SalaryDistributionChart';
import JobTitleDistributionChart from '../../common/Charts/JobTitleDistrubitionChart';
import styles from '../../LandingPage/SummarySection.module.css';
import moduleStyles from './ChartsZone.module.css';

const selectJobAverageSalaries = R.compose(
  R.pathOr([], ['salary_work_time_statistics', 'job_average_salaries']),
);
const selectSalaryDistributionBins = R.compose(
  R.pathOr([], ['salary_distribution', 'bins']),
);

const ChartsZone = ({ experience, company, jobTitle }) => (
  <div className={cn(styles.page, moduleStyles.container)}>
    <ChartWrapper
      className={styles.chartWrapper}
      title={`${experience.company.name}的薪水`}
      to={generatePath('/companies/:companyName', {
        companyName: experience.company.name,
      })}
    >
      <React.Fragment>
        <div className={styles.barChart}>
          <JobTitleDistributionChart data={selectJobAverageSalaries(company)} />
        </div>
      </React.Fragment>
    </ChartWrapper>

    <ChartWrapper
      className={styles.chartWrapper}
      title={`${experience.job_title.name}的薪水分佈`}
      to={generatePath('/job-titles/:jobTitle', {
        jobTitle: experience.job_title.name,
      })}
    >
      <React.Fragment>
        <div className={styles.barChart}>
          <SalaryDistributionChart
            data={selectSalaryDistributionBins(jobTitle)}
          />
        </div>
      </React.Fragment>
    </ChartWrapper>
  </div>
);

ChartsZone.propTypes = {
  experience: PropTypes.object.isRequired,
  company: PropTypes.object,
  jobTitle: PropTypes.object,
};

export default ChartsZone;
