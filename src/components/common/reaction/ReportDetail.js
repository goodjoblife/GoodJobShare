import React from 'react';
import PropTypes from 'prop-types';

import Base from './Base';

const ReportDetail = ({ onClick, label, ...restProps }) => (
  <Base
    onClick={onClick}
    label={label}
    {...restProps}
  />
);

ReportDetail.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default ReportDetail;
