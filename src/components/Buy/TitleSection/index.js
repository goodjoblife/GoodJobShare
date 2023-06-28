import React from 'react';
import { Section, Heading } from 'common/base';

const TitleSection = ({ ...props }) => (
  <Section {...props}>
    <Heading size="l" center>
      付費解鎖全站
    </Heading>
  </Section>
);

export default TitleSection;
