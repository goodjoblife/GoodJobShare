import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Checkbox.module.css';

const Checkbox = ({
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
  checked: PropTypes.bool.isRequired,
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
