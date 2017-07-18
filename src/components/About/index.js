import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'common/base';
import helmetData from '../../constants/helmetData';

const About = () => (
  <Section Tag="main" pageTop paddingBottom>
    <Helmet {...helmetData.ABOUT} />
    <Wrapper size="l">
      About
    </Wrapper>
  </Section>
);

export default About;
