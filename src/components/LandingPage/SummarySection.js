import React, { useState } from 'react';

import Carousel from './Carousel';
import styles from './SummarySection.module.css';

const SummarySection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className={styles.summarySection}>
      <Carousel selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex}>
        <Carousel.Page>Page1</Carousel.Page>
        <Carousel.Page>Page2</Carousel.Page>
        <Carousel.Page>Page3</Carousel.Page>
      </Carousel>
    </div>
  );
};

export default SummarySection;
