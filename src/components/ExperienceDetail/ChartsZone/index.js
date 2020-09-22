import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { generatePath } from 'react-router';
import R from 'ramda';
import ChartWrapper from '../../LandingPage/ChartWrapper';
import SalaryDistributionChart from '../../common/Charts/SalaryDistributionChart';
import JobTitleDistributionChart from '../../common/Charts/JobTitleDistrubitionChart';
import styles from '../../LandingPage/SummarySection.module.css';
import moduleStyles from './ChartsZone.module.css';

const isEmptyOrNull = R.either(R.isEmpty, R.isNil);

const ChartsZone = ({
  experience: {
    company: {
      name: companyName,
      salary_work_time_statistics: { job_average_salaries },
    },
    job_title: {
      name: jobTitle,
      salary_distribution: { bins },
    },
  },
}) => {
  if (isEmptyOrNull(job_average_salaries) && isEmptyOrNull(bins)) {
    return null;
  }
  return (
    <div className={cn(styles.page, moduleStyles.container)}>
      {isEmptyOrNull(job_average_salaries) ? null : (
        <ChartWrapper
          className={styles.chartWrapper}
          title={`${companyName}的薪水`}
          to={generatePath('/companies/:companyName', {
            companyName,
          })}
        >
          <React.Fragment>
            <div className={styles.barChart}>
              <JobTitleDistributionChart data={job_average_salaries} />
            </div>
          </React.Fragment>
        </ChartWrapper>
      )}
      {isEmptyOrNull(bins) ? null : (
        <ChartWrapper
          className={styles.chartWrapper}
          title={`${jobTitle}的薪水分佈`}
          to={generatePath('/job-titles/:jobTitle', {
            jobTitle,
          })}
        >
          <React.Fragment>
            <div className={styles.barChart}>
              <SalaryDistributionChart data={bins} />
            </div>
          </React.Fragment>
        </ChartWrapper>
      )}
    </div>
  );
};

ChartsZone.propTypes = {
  experience: PropTypes.object.isRequired,
  company: PropTypes.object,
  jobTitle: PropTypes.object,
};

export default ChartsZone;
