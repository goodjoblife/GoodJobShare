import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Checkbox.module.css';

const Checkbox = ({
  id, name, label, value, checked, disabled, margin, onChange, style,
}) => (
  <div
    className={cn(styles.formGroup, { [styles.disabled]: disabled })}
    style={{ margin, ...style }}
  >
    <input
      type="checkbox"
      id={id || `checkbox-${value}`}
      name={name}
      value={value}
      checked={checked}
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
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Checkbox;
