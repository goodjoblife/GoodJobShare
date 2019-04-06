import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = ({
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

RouteWithSubRoutes.defaultProps = {
  children: props => <React.Fragment {...props} />,
  hasHeader: true,
  hasFooter: true,
};

export default RouteWithSubRoutes;
