import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './RadioButton.module.css';

const RadioButton = ({
  id, label, name, value, checked, onChange, emoji,
}) => (
  <div className={styles.radioButtonItem}>
    <input
      type="radio" id={id || `radio-${value}`}
      name={name} value={value}
      checked={checked} onChange={onChange}
    />
    <label
      className={styles.radioSquare}
      htmlFor={id || `radio-${value}`}
    >
      {emoji && <i className={cn(styles.radioSquareIcon, styles[emoji])} />}
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
