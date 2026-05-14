import React, { useEffect } from 'react';
import cn from 'classnames';
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
import BoxesRenderer from 'common/StatusRenderer/BoxesRenderer';

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

type ChartsZoneProps = {
  companyName: string;
  jobTitle: string;
};

const ChartsZone: React.FC<ChartsZoneProps> = ({ companyName, jobTitle }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryCompanyOverviewStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  const companyStatisticsBox = useSelector(
    companyOverviewStatisticsBoxSelectorByName(companyName),
  );
  const jobTitleStatisticsBox = useSelector(
    jobTitleOverviewStatisticsBoxSelectorByName(jobTitle),
  );

  return (
    <BoxesRenderer
      boxes={[companyStatisticsBox, jobTitleStatisticsBox]}
      render={([companyStatistics, jobTitleStatistics]): React.ReactNode => {
        // data is null when the company or job title does not exist
        if (!companyStatistics || !jobTitleStatistics) {
          return null;
        }

        const jobAverageSalaries = companyStatistics.jobAverageSalaries;
        const salaryDistributionBins = jobTitleStatistics.salaryDistribution;

        if (
          jobAverageSalaries.length === 0 &&
          salaryDistributionBins.length === 0
        ) {
          return null;
        }

        return (
          <div className={cn(styles.page, moduleStyles.container)}>
            {jobAverageSalaries.length > 0 && (
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
            {salaryDistributionBins.length > 0 && (
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
      }}
    />
  );
};

export default ChartsZone;
