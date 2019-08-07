import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader';
import { isUnfetched, isFetching, isError } from '../../constants/status';

const StatusRenderer = ({ status, children: Element, ...props }) => {
  if (isUnfetched(status)) {
    return null;
  }
  if (isFetching(status)) {
    return <Loader size="s" {...props} />;
  }
  if (isError(status)) {
    return null;
  }
  return <Element {...props} />;
};

StatusRenderer.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.elementType.isRequired,
};

export default StatusRenderer;
