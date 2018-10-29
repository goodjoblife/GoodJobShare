import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import { PermissionContextProvider } from 'common/permission-context';
import { FacebookContextProvider } from 'common/facebook';

import App from './App';
import { GA_ID, PIXEL_ID } from '../config';

const logPageView = location => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
};

class Root extends Component {
  componentDidMount() {
    // initialize google analytics
    ReactGA.initialize(GA_ID);

    // initialize facebook pixel
    ReactPixel.init(PIXEL_ID);
    ReactPixel.pageView();

    const { location } = this.props;
    logPageView(location);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;
    if (location !== prevLocation) {
      logPageView(location);
    }
  }

  render() {
    return (
      <PermissionContextProvider>
        <FacebookContextProvider>
          <App />
        </FacebookContextProvider>
      </PermissionContextProvider>
    );
  }
}

Root.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
};

export default withRouter(Root);
