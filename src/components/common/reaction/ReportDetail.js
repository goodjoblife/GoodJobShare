import React from 'react';
import PropTypes from 'prop-types';

import Base from './Base';
import Exclamation from '../icons/Exclamation';

import styles from './Base.module.css';

const ReportDetail = ({ onClick, label }) => (
  <Base
    onClick={onClick}
    label={label}
  >
    <Exclamation
      className={onClick ? styles.clickable : ''}
    />
  </Base>
);

ReportDetail.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default ReportDetail;
