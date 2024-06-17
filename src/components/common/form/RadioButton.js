import React from 'react';
import PropTypes from 'prop-types';

import Emoji from 'common/icons/Emoji';
import styles from './RadioButton.module.css';

const RadioButton = ({ id, label, name, value, checked, onChange, emoji }) => (
  <div className={styles.radioButtonItem}>
    <input
      type="radio"
      id={id || `radio-${value}`}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label className={styles.radioSquare} htmlFor={id || `radio-${value}`}>
      {emoji && <Emoji className={styles.radioSquareIcon} emoji={emoji} />}
      <span className={styles.radioSquareText}>{label}</span>
    </label>
  </div>
);

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  emoji: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioButton;
