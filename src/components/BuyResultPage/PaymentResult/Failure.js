import React from 'react';
import PropTypes from 'prop-types';

const Failure = ({ publicId }) => {
  return <div>{`Failure with ${publicId}`}</div>;
};

Failure.propTypes = {
  publicId: PropTypes.string,
};

Failure.defaultProps = {
  publicId: '',
};

export default Failure;
