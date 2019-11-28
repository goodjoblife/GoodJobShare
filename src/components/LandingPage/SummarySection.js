import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { zip } from 'ramda';

import Carousel, { CarouselPage } from 'common/Carousel';
import ChartWrapper from './ChartWrapper';
import CompanyDistributionChart from '../common/Charts/CompanyDistributionChart';
import JobTitleDistributionChart from '../common/Charts/JobTitleDistrubitionChart';
import styles from './SummarySection.module.css';

const SummarySection = ({
  popularCompanyAverageSalary,
  popularJobTitleSalaryDistribution,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dataPairs = useMemo(
    () => zip(popularCompanyAverageSalary, popularJobTitleSalaryDistribution),
    [popularCompanyAverageSalary, popularJobTitleSalaryDistribution],
  );

  if (dataPairs.length === 0) {
    return null;
  }

  return (
    <div className={styles.summarySection}>
      <Carousel selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex}>
        {dataPairs.map(
          ([companyAverageSalary, jobTitleSalaryDistribution], i) => (
            <CarouselPage key={i}>
              <div className={styles.page}>
                <ChartWrapper
                  className={styles.chartWrapper}
                  title={`${companyAverageSalary.name}的薪水`}
                  to={`/companies/${companyAverageSalary.name}`}
                >
                  <JobTitleDistributionChart
                    data={
                      companyAverageSalary.salary_work_time_statistics
                        .job_average_salaries
                    }
                  />
                </ChartWrapper>
                <ChartWrapper
                  className={styles.chartWrapper}
                  title={`${jobTitleSalaryDistribution.name}的薪水分佈`}
                  to={`/job-titles/${jobTitleSalaryDistribution.name}`}
                >
                  <CompanyDistributionChart
                    data={jobTitleSalaryDistribution.salary_distribution.bins}
                  />
                </ChartWrapper>
              </div>
            </CarouselPage>
          ),
        )}
      </Carousel>
    </div>
  );
};

SummarySection.propTypes = {
  popularCompanyAverageSalary: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.shape({
        name: PropTypes.string,
      }),
      average_salaries: PropTypes.array,
    }),
  ).isRequired,
  popularJobTitleSalaryDistribution: PropTypes.arrayOf(
    PropTypes.shape({
      job_title: PropTypes.shape({
        name: PropTypes.string,
      }),
      bins: PropTypes.array,
    }),
  ).isRequired,
};

export default SummarySection;
