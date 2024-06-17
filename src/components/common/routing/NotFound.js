import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';

const NotFound = ({ status, children }) => (
  <Status status={status}>{children}</Status>
);

NotFound.propTypes = {
  children: PropTypes.node,
  status: PropTypes.number.isRequired,
};

NotFound.defaultProps = {
  status: 404,
  children: null,
};

export default NotFound;
