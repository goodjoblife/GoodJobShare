import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Top.module.css';

const Top = ({ children, to }) =>
  to ? (
    <Link to={to} className={styles.root}>
      {children}
    </Link>
  ) : (
    <div className={styles.root}>{children}</div>
  );

Top.propTypes = {
  children: PropTypes.node,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Top;
