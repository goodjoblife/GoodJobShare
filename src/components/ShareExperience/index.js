import React from 'react';
import PropTypes from 'prop-types';

import { Section, Wrapper } from 'common/base';

const ShareExperience = ({ children }) => (
  <Section Tag="main" pageTop paddingBottom>
    <Wrapper size="m">
      {children}
    </Wrapper>
  </Section>
);

ShareExperience.propTypes = {
  children: PropTypes.node,
};

export default ShareExperience;
