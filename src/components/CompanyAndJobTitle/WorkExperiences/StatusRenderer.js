import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader';
import { isUnfetched, isFetching, isError } from '../../../constants/status';
import WorkExperiences from './WorkExperiences';

const StatusRenderer = ({ status, ...props }) => {
  if (isUnfetched(status)) {
    return null;
  }
  if (isFetching(status)) {
    return <Loader size="s" {...props} />;
  }
  if (isError(status)) {
    return null;
  }
  return <WorkExperiences {...props} />;
};

StatusRenderer.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusRenderer;
