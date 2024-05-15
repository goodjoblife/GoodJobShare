import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader';
import { isUnfetched, isFetching, isError } from 'constants/status';

const StatusRenderer = ({ status, children, ...props }) => {
  if (isUnfetched(status)) {
    return null;
  }
  if (isFetching(status)) {
    return <Loader size="s" />;
  }
  if (isError(status)) {
    return null;
  }
  return children;
};

StatusRenderer.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default StatusRenderer;
