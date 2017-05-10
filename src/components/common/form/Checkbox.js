import React, { PropTypes } from 'react';

import styles from './Checkbox.module.css';

const Checkbox = ({
  id, name, label, value, checked, margin, onChange,
}) => (
  <div
    className={styles.formGroup}
    style={{ margin }}
  >
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

Checkbox.defaultProps = {
  margin: '20px 0 0 0',
};

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  margin: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
