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
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  emoji: PropTypes.string,
};

export default RadioButton;
