import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = route => {
  const { routes, component: Component, ...routeProps } = route;
  if (routes) {
    return (
      <Route
        {...routeProps}
        render={props => <Component {...props} routes={routes} />}
      />
    );
  }
  return <Route component={Component} {...routeProps} />;
};

export default RouteWithSubRoutes;
