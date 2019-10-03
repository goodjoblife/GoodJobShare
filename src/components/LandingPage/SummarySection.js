import React, { useState } from 'react';

import Carousel from './Carousel';
import ChartWrapper from './ChartWrapper';
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
              ChartView
            </ChartWrapper>
            <ChartWrapper
              className={styles.chartWrapper}
              title="軟體工程師的薪水分佈"
              to="/job-titles/軟體工程師"
            >
              ChartView
            </ChartWrapper>
          </div>
        </Carousel.Page>
      </Carousel>
    </div>
  );
};

export default SummarySection;
