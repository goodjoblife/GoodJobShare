import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Add http status code when SSR
const Status = ({ status, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = status; // eslint-disable-line no-param-reassign
      }
      return children;
    }}
  />
);

Status.propTypes = {
  status: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Status.defaultProps = {
  children: null,
};

export default Status;
