import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';

import routes from '../routes';


const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router
      history={history}
      routes={routes(store)}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};


export default Root;
