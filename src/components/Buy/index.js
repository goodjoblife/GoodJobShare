import React from 'react';
import { Section, Wrapper, Heading } from 'common/base';
import SubscriptionsSection from './SubscriptionsSection';

export default () => (
  <Section paddingTop paddingBottom>
    <Wrapper size="s">
      <Heading center>付費解鎖全站</Heading>
      <SubscriptionsSection />
    </Wrapper>
  </Section>
);
