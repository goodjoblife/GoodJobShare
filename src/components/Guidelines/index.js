import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'common/base';
import helmetData from '../../constants/helmetData';

const GuideLines = () => (
  <Section Tag="main" pageTop paddingBottom>
    <Helmet {...helmetData.GUIDELINES} />
    <Wrapper size="l">
      GuideLines
    </Wrapper>
  </Section>
);

export default GuideLines;
