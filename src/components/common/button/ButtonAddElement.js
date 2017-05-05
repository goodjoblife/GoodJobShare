import React, { PropTypes } from 'react';
import styles from './ButtonAddElement.module.css';

const ButtonAddElement = ({ text, onClick, custimized }) => (
  <button
    onClick={onClick}
    className={custimized ? styles.custimized : styles.button}
  >
    {text}
  </button>
);

ButtonAddElement.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  custimized: PropTypes.bool,
};

export default ButtonAddElement;
