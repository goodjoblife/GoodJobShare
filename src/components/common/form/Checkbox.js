import React, { PropTypes } from 'react';

import styles from './Checkbox.module.css';

const Checkbox = ({ id, name, label, value, checked, onChange }) => (
  <div className={styles.formGroup}>
    <input
      type="checkbox" id={id || `checkbox-${value}`}
      name={name} value={value} checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id || `checkbox-${value}`}>
      <span className={styles.checkboxInput} />
      <span className={styles.checkboxText}>{label}</span>
    </label>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
