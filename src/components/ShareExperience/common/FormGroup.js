import React, { PropTypes } from 'react';
import styles from './FormGroup.module.css';

const FormGroup = ({ children }) => (
  <div className={styles.group}>
    {children}
  </div>
);
FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormGroup;
