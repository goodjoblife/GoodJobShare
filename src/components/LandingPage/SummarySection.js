import React, { useState } from 'react';

import Carousel from 'common/Carousel';
import ChartWrapper from './ChartWrapper';
import CompanyDistributionChart from './CompanyDistributionChart';
import JobTitleDistributionChart from './JobTitleDistrubitionChart';
import styles from './SummarySection.module.css';

const SummarySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className={styles.summarySection}>
      <Carousel selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex}>
        <Carousel.Page>
          <div className={styles.page}>
            <ChartWrapper
              className={styles.chartWrapper}
              title="聯發科股份有限公司的薪水"
              to="/companies/聯發科"
            >
              <JobTitleDistributionChart />
            </ChartWrapper>
            <ChartWrapper
              className={styles.chartWrapper}
              title="軟體工程師的薪水分佈"
              to="/job-titles/軟體工程師"
            >
              <CompanyDistributionChart />
            </ChartWrapper>
          </div>
        </Carousel.Page>
      </Carousel>
    </div>
  );
};

export default SummarySection;
