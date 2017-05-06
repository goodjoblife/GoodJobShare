import React, { PropTypes } from 'react';

import Cross from '../../images/x.svg';
import styles from './AddButton.module.css';

const AddButton = ({ active, onClick }) => (
  <button
    className={active ? styles.active : styles.button}
    onClick={onClick}
  >
    <Cross
      className={active ? styles.cross__active : styles.cross}
    />
  </button>
);

AddButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AddButton;
