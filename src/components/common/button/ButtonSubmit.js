import React from 'react';
import PropTypes from 'prop-types';

import styles from './ButtonSubmit.module.css';

const ButtonSubmit = ({ text, onClick, disabled }) => (
  <button
    className={styles.container}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

ButtonSubmit.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ButtonSubmit;
