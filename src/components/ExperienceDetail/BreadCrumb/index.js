import React from 'react';
import PropTypes from 'prop-types';
import styles from './BreadCrumb.module.css';

const BreadCrumb = ({ labels }) => (
  <div className={styles.breadCrumb}>{labels.join(' > ')}</div>
);

BreadCrumb.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BreadCrumb;
