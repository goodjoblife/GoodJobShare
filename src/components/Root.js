import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import { PermissionContextProvider } from 'common/permission-context';
import { FacebookContextProvider } from 'common/facebook';

import App from './App';
import { activateOptimize } from '../utils/gtm';
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

    // log pageview to Google Analytics
    const { location } = this.props;
    logPageView(location);

    // activate google optimize
    activateOptimize();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;
    if (location !== prevLocation) {
      logPageView(location);

      // 因為 react 是 SPA，需要在每次 route 改變時
      // push event 到 window.dataLayer 去觸發 google optimize 實驗
      activateOptimize();
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
