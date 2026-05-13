import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { PageType, generatePageURL } from 'constants/companyJobTitle';
import ChartWrapper from '../../LandingPage/ChartWrapper';
import loadable from '@loadable/component';
import styles from '../../LandingPage/SummarySection.module.css';
import moduleStyles from './ChartsZone.module.css';
import { queryCompanyOverviewStatistics } from 'actions/company';
import { queryJobTitleOverviewStatistics } from 'actions/jobTitle';
import {
  companyOverviewStatisticsBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

const isEmptyOrNull = R.either(R.isEmpty, R.isNil);

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

const ChartsZone = ({ companyName, jobTitle }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryCompanyOverviewStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  const jobAverageSalaries = useSelector(
    useMemo(
      () => state => {
        const box = companyOverviewStatisticsBoxSelectorByName(companyName)(
          state,
        );
        return isFetched(box) && box.data ? box.data.jobAverageSalaries : [];
      },
      [companyName],
    ),
  );

  const salaryDistributionBins = useSelector(
    useMemo(
      () => state => {
        const box = jobTitleOverviewStatisticsBoxSelectorByName(jobTitle)(
          state,
        );
        return isFetched(box) && box.data ? box.data.salaryDistribution : [];
      },
      [jobTitle],
    ),
  );

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
  companyName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
};

export default ChartsZone;
