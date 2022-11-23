import React from 'react';
import { Section, Wrapper } from 'common/base';
import SubscriptionsSection from './SubscriptionsSection';
import PaymentSection from './PaymentSection';
import TitleSection from './TitleSection';
import styles from './Buy.module.css';

const Buy = () => {
  return (
    <Section>
      <Wrapper size="s">
        <TitleSection paddingTop />
        <SubscriptionsSection paddingTop paddingBottom />
        <PaymentSection
          className={styles.topDivider}
          paddingTop
          paddingBottom
        />
      </Wrapper>
    </Section>
  );
};

export default Buy;
