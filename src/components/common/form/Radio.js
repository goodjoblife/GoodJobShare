import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './Radio.module.css';

const Radio = ({ id, label, name, value, inline, checked, onChange }) => (
  <div
    className={`${styles.formGroup} ${inline ? styles.inline : styles.block}`}
  >
    <input
      type="radio" id={id || `radio-${value}`}
      name={name} value={value} checked={checked}
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

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
