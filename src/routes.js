import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/Layout';
import LaborLecture from './containers/LaborLecture';
import * as containers from './containers';


const {
  LandingPage,
  AnotherPage,
  NotFoundPage,
} = containers;

const routes = () => (
  <Route
    path="/"
    component={App}
  >
    <IndexRoute component={LandingPage} />
    <Route path="/labor-lecture" component={LaborLecture} />
    <Route path="/another" component={AnotherPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
