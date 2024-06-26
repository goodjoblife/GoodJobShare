import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader';
import { isUnfetched, isFetching, isError } from 'constants/status';

const StatusRenderer = ({ status, error, children, render, ...props }) => {
  if (isUnfetched(status)) {
    return null;
  }
  if (isFetching(status)) {
    return <Loader size="s" />;
  }
  if (isError(status)) {
    return null;
  }

  if (render) {
    return render();
  }
  return children;
};

StatusRenderer.propTypes = {
  children: PropTypes.node,
  error: PropTypes.object,
  render: PropTypes.func,
  status: PropTypes.string.isRequired,
};

export default StatusRenderer;
