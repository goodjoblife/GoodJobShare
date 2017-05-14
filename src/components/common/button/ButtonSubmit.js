import React from 'react';
import PropTypes from 'prop-types';

import styles from './ButtonSubmit.module.css';

const ButtonSubmit = ({ text, onClick }) => (
  <button
    className={styles.container}
    onClick={onClick}
  >
    {text}
  </button>
);

ButtonSubmit.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonSubmit;
