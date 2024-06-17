import React from 'react';
import PropTypes from 'prop-types';
import styles from './ButtonAddElement.module.css';

const ButtonAddElement = ({ text, onClick, custimized, disabled }) => (
  <button
    onClick={onClick}
    className={custimized ? styles.custimized : styles.button}
    disabled={disabled}
  >
    {text}
  </button>
);

ButtonAddElement.propTypes = {
  custimized: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default ButtonAddElement;
