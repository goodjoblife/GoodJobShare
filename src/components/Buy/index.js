import React from 'react';
import { Section, Wrapper, Heading } from 'common/base';
import SubscriptionsSection from './SubscriptionsSection';
import PaymentSection from './PaymentSection';

const Buy = () => {
  return (
    <Section paddingTop paddingBottom>
      <Wrapper size="s">
        <Heading size="l" center>
          付費解鎖全站
        </Heading>
        <SubscriptionsSection />
        <PaymentSection />
      </Wrapper>
    </Section>
  );
};

export default Buy;
