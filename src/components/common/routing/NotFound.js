import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';

const NotFound = ({ status, children }) => (
  <Status status={status}>
    { children }
  </Status>
);

NotFound.propTypes = {
  status: PropTypes.number.isRequired,
  children: PropTypes.node,
};

NotFound.defaultProps = {
  status: 404,
  children: null,
};

export default NotFound;
