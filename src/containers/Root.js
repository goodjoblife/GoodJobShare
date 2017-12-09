import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import ReactGA from 'react-ga';

import routes from '../routes';

class Root extends Component {
  constructor(props) {
    super(props);
    this.initGA();
  }

  initGA = () => {
    ReactGA.initialize(process.env.GA_ID);
  }

  logPageView = () => {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
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
