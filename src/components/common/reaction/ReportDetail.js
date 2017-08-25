import React from 'react';
import PropTypes from 'prop-types';

import Base from './Base';
import Ellipses from '../icons/Ellipses';

import styles from './Base.module.css';

const ReportDetail = ({ onClick }) => (
  <Base
    onClick={onClick}
  >
    <Ellipses
      className={onClick ? styles.clickable : ''}
    />
  </Base>
);

ReportDetail.propTypes = {
  onClick: PropTypes.func,
};

export default ReportDetail;
