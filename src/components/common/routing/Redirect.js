import React from 'react';
import { Redirect as RouterRedirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Status from './Status';

// Add http status code 301 when SSR
const Redirect = ({ status, ...props }) => (
  <Status status={status}>
    <RouterRedirect {...props} />
  </Status>
);

Redirect.propTypes = {
  status: PropTypes.number,
};

Redirect.defaultProps = {
  status: 301,
};

export default Redirect;
