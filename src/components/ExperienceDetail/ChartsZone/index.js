import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';
import { PageType, generatePageURL } from 'constants/companyJobTitle';
import ChartWrapper from '../../LandingPage/ChartWrapper';
import loadable from '@loadable/component';
import styles from '../../LandingPage/SummarySection.module.css';
import moduleStyles from './ChartsZone.module.css';

const isEmptyOrNull = R.either(R.isEmpty, R.isNil);

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

const ChartsZone = ({
  experience: {
    company: { name: companyName },
    job_title: { name: jobTitle },
  },
  jobAverageSalaries,
  salaryDistributionBins,
}) => {
  if (
    isEmptyOrNull(jobAverageSalaries) &&
    isEmptyOrNull(salaryDistributionBins)
  ) {
    return null;
  }
  return (
    <div className={cn(styles.page, moduleStyles.container)}>
      {isEmptyOrNull(jobAverageSalaries) ? null : (
        <ChartWrapper
          className={styles.chartWrapper}
          title={`${companyName}的薪水`}
          to={generatePageURL({
            pageType: PageType.COMPANY,
            pageName: companyName,
          })}
        >
          <React.Fragment>
            <div className={styles.barChart}>
              <JobTitleDistributionChart data={jobAverageSalaries} />
            </div>
          </React.Fragment>
        </ChartWrapper>
      )}
      {isEmptyOrNull(salaryDistributionBins) ? null : (
        <ChartWrapper
          className={styles.chartWrapper}
          title={`${jobTitle}的薪水分佈`}
          to={generatePageURL({
            pageType: PageType.JOB_TITLE,
            pageName: jobTitle,
          })}
        >
          <React.Fragment>
            <div className={styles.barChart}>
              <SalaryDistributionChart data={salaryDistributionBins} />
            </div>
          </React.Fragment>
        </ChartWrapper>
      )}
    </div>
  );
};

ChartsZone.propTypes = {
  experience: PropTypes.object.isRequired,
  jobAverageSalaries: PropTypes.array.isRequired,
  salaryDistributionBins: PropTypes.array.isRequired,
};

export default ChartsZone;
