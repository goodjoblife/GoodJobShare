import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'common/base';
import helmetData from '../../constants/helmetData';

const Faq = () => (
  <Section Tag="main" pageTop paddingBottom>
    <Helmet {...helmetData.FAQ} />
    <Wrapper size="l">
      Faq
    </Wrapper>
  </Section>
);

export default Faq;
