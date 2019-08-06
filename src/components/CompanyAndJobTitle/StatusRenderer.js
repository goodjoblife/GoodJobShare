import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader';
import { isUnfetched, isFetching, isError } from '../../constants/status';

const StatusRenderer = ({ status, children, ...props }) => {
  if (isUnfetched(status)) {
    return null;
  }
  if (isFetching(status)) {
    return <Loader size="s" {...props} />;
  }
  if (isError(status)) {
    return null;
  }
  return children(props);
};

StatusRenderer.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default StatusRenderer;
