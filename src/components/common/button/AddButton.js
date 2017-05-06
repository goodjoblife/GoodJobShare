import React, { PropTypes } from 'react';

import Cross from '../../images/x.svg';
import styles from './AddButton.module.css';

const AddButton = ({ isActive, onClick }) => (
  <button
    className={isActive ? styles.active : styles.button}
    onClick={onClick}
  >
    <Cross
      className={isActive ? styles.cross__active : styles.cross}
    />
  </button>
);

AddButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AddButton;
