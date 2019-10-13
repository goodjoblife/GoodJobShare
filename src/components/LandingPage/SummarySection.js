import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { zip } from 'ramda';

import Carousel from 'common/Carousel';
import ChartWrapper from './ChartWrapper';
import CompanyDistributionChart from './CompanyDistributionChart';
import JobTitleDistributionChart from './JobTitleDistrubitionChart';
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
  return (
    <div className={styles.summarySection}>
      <Carousel selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex}>
        {dataPairs.map(
          ([companyAverageSalary, jobTitleSalaryDistribution], i) => (
            <Carousel.Page key={i}>
              <div className={styles.page}>
                <ChartWrapper
                  className={styles.chartWrapper}
                  title={`${companyAverageSalary.company.name}的薪水`}
                  to={`/companies/${companyAverageSalary.company.name}`}
                >
                  <JobTitleDistributionChart
                    data={companyAverageSalary.average_salaries}
                  />
                </ChartWrapper>
                <ChartWrapper
                  className={styles.chartWrapper}
                  title={`${jobTitleSalaryDistribution.job_title.name}的薪水分佈`}
                  to={`/job-titles/${jobTitleSalaryDistribution.job_title.name}`}
                >
                  <CompanyDistributionChart
                    data={jobTitleSalaryDistribution.bins}
                  />
                </ChartWrapper>
              </div>
            </Carousel.Page>
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
