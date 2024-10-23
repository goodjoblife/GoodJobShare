import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Radio.module.css';

const Radio = ({
  id,
  label,
  name,
  value,
  inline,
  checked,
  margin,
  onChange,
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
    <label className={styles.radioCircle} htmlFor={id || `radio-${value}`}>
      <span
        className={styles.radioInput}
        tabIndex="0"
        onKeyDown={e =>
          [' ', 'enter'].includes(e.key.toLowerCase()) && onChange(e)
        }
      />
      <span className={styles.radioText}>{label}</span>
    </label>
  </div>
);

Radio.marginBlock = '20px 0 0 0';
Radio.marginInline = '0 30px 0 0';
Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Radio;
