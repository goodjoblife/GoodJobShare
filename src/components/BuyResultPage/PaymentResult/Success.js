import React from 'react';
import PropTypes from 'prop-types';

const Success = ({ expiredAt }) => {
  return <div>{`Success with ${expiredAt}`}</div>;
};

Success.propTypes = {
  expiredAt: PropTypes.instanceOf(Date),
};

export default Success;
