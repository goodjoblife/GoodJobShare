import React from 'react';

import LandingPage from './containers/LandingPage';
import About from './components/About';

const routes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    render: () => (<div>Not Found!</div>),
  },
];

export default routes;
