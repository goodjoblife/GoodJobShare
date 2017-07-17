import React from 'react';
import Helmet from 'react-helmet';
import { Section, Wrapper } from 'common/base';
import helmetData from '../../constants/helmetData';

const Recruit = () => (
  <Section Tag="main" pageTop paddingBottom>
    <Helmet {...helmetData.RECRUIT} />
    <Wrapper size="l">
      Recruit
    </Wrapper>
  </Section>
);

export default Recruit;
