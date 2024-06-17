import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './PaymentSection.module.css';

const Row = ({ className, half, ...props }) => (
  <div
    className={cn(styles.row, half ? styles.half : styles.full, className)}
    {...props}
  />
);

Row.propTypes = {
  className: PropTypes.string,
  half: PropTypes.bool,
};

export default Row;
