import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Checkbox.module.css';

const Checkbox = ({
  className,
  id,
  name,
  label,
  value,
  checked,
  disabled,
  margin,
  onChange,
  style,
}) => (
  <div
    className={cn(styles.formGroup, className, {
      [styles.disabled]: disabled,
    })}
    style={{ margin, ...style }}
  >
    <input
      type="checkbox"
      id={id || `checkbox-${value}`}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
    <label htmlFor={id || `checkbox-${value}`}>
      <span className={styles.checkboxInput} />
      <span className={styles.checkboxText}>{label}</span>
    </label>
  </div>
);

Checkbox.defaultProps = {
  className: undefined,
  disabled: false,
  id: undefined,
  margin: '20px 0 0 0',
  name: undefined,
  style: {},
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  margin: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
};

export default Checkbox;
