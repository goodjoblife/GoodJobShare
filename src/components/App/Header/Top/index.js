import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Top.module.css';

const Top = ({ children, link }) =>
  link ? (
    <Link to={link} className={styles.root}>
      {children}
    </Link>
  ) : (
    <div className={styles.root}>{children}</div>
  );

Top.propTypes = {
  link: PropTypes.string,
};

export default Top;
