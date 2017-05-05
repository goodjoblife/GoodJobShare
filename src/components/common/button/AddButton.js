import React, { PropTypes } from 'react';

import styles from './AddButton.module.css';

const AddButton = ({ isActive, onClick }) => (
  <button
    className={isActive ? styles.active : styles.button}
    onClick={onClick}
  >
    +
  </button>
);

AddButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AddButton;
