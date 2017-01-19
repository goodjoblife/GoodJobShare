import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import createRoutes from '../createRoutes';


const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={createRoutes(store)} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};


export default Root;
