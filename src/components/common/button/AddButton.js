import React, { PropTypes } from 'react';
import cn from 'classnames';

import X from 'common/icons/X';
import styles from './AddButton.module.css';

const AddButton = ({ active, onClick, addQa, deleteBtn }) => (
  <button
    className={cn(styles.button, {
      [styles.active]: active,
      [styles.addQa]: addQa,
      [styles.deleteBtn]: deleteBtn,
    })}
    onClick={onClick}
  >
    <X className={styles.cross} />
  </button>
);

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  addQa: PropTypes.bool,
  deleteBtn: PropTypes.bool,
};

export default AddButton;
