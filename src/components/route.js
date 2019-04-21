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

export const AppRouteWithSubRoutes = ({
  routes,
  component: Component,
  children,
  hasHeader,
  hasFooter,
  ...routeProps
}) => {
  if (routes) {
    return children({
      children: (
        <Route
          {...routeProps}
          render={props => <Component {...props} routes={routes} />}
        />
      ),
      hasHeader,
      hasFooter,
    });
  }

  return children({
    children: <Route component={Component} {...routeProps} />,
    hasHeader,
    hasFooter,
  });
};

AppRouteWithSubRoutes.defaultProps = {
  hasHeader: true,
  hasFooter: true,
};
