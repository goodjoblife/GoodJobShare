import React from 'react';
import { Section, Wrapper, Heading } from 'common/base';
import SubscriptionsSection from './SubscriptionsSection';
import PaymentSection from './PaymentSection';

export default () => (
  <Section paddingTop paddingBottom>
    <Wrapper size="s">
      <Heading center>付費解鎖全站</Heading>
      <SubscriptionsSection />
      <PaymentSection />
    </Wrapper>
  </Section>
);
