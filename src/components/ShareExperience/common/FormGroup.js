import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormGroup.module.css';

const FormGroup = ({ children }) => (
  <div className={styles.group}>{children}</div>
);
FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormGroup;
