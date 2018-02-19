import React from 'react';
import PropTypes from 'prop-types';

import styles from './TextInput.module.css';

const TextInput = (
  { value, placeholder, onChange, isWarning, warningWording, type, style, min, max }
) => (
  <div
    style={{
      position: 'relative',
      ...style,
    }}
  >
    <input
      type={type}
      placeholder={placeholder}
      className={isWarning ? styles.warning : styles.input}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
    {
      warningWording ?
        <p
          className={`
            pS ${styles.warning__text} ${isWarning ? styles.isWarning : ''}
          `}
        >
          { warningWording }
        </p> : null
    }
  </div>
);


TextInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isWarning: PropTypes.bool,
  warningWording: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
