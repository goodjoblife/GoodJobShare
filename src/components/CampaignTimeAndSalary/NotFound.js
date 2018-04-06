import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const NotFound = ({ staticContext, match: { params: { campaign_name } } }) => {
  if (staticContext) {
    staticContext.status = 301; // eslint-disable-line no-param-reassign
  }
  return (<Redirect to={'/time-and-salary/campaigns/:campaign_name/latest'.replace(':campaign_name', campaign_name)} />);
};

NotFound.propTypes = {
  staticContext: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export default NotFound;
