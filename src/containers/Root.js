import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import routes from '../routes';

class Root extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init = () => {
    // initialize google analytics
    ReactGA.initialize(process.env.GA_ID);

    // initialize facebook pixel
    ReactPixel.init(process.env.PIXEL_ID);
  }

  logPageView = () => {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);

    ReactPixel.pageView();
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router
          history={history}
          routes={routes(store)}
          render={applyRouterMiddleware(useScroll())}
          onUpdate={this.logPageView}
        />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};


export default Root;
