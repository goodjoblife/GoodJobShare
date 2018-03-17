import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const NotFound = ({ staticContext }) => {
  if (staticContext) {
    staticContext.status = 301; // eslint-disable-line no-param-reassign
  }
  return (<Redirect to="/time-and-salary/latest" />);
};

NotFound.propTypes = {
  staticContext: PropTypes.object,
};

export default NotFound;
