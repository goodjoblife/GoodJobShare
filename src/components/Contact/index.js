import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'common/base';
import helmetData from '../../constants/helmetData';

const Contact = () => (
  <Section Tag="main" pageTop paddingBottom>
    <Helmet {...helmetData.CONTACT} />
    <Wrapper size="l">
      Contact
    </Wrapper>
  </Section>
);

export default Contact;
