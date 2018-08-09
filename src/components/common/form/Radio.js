import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Radio.module.css';

const Radio = ({
  id, label, name, value, inline, checked, margin, onChange,
}) => (
  <div
    className={cn(styles.formGroup, { [styles.inline]: inline })}
    style={{
      margin: margin || (inline ? Radio.marginInline : Radio.marginBlock),
    }}
  >
    <input
      type="radio"
      id={id || `radio-${value}`}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label
      className={styles.radioCircle}
      htmlFor={id || `radio-${value}`}
    >
      <span className={styles.radioInput} />
      <span className={styles.radioText}>{label}</span>
    </label>
  </div>
);

Radio.marginBlock = '20px 0 0 0';
Radio.marginInline = '0 30px 0 0';
Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  margin: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
