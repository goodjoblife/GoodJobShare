import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Section, Wrapper } from 'common/base';

import RouteWithSubRoutes from '../route';

const ShareExperience = ({ routes }) => (
  <Section Tag="main" pageTop paddingBottom>
    <Wrapper size="m">
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Wrapper>
  </Section>
);

ShareExperience.propTypes = {
  routes: PropTypes.array,
};

export default ShareExperience;
