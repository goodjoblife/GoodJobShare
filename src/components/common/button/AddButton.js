import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import X from 'common/icons/X';
import styles from './AddButton.module.css';

const AddButton = ({ active, onClick, addSection, addQa, deleteBtn }) => (
  <div
    className={cn({
      [styles.addQa]: addQa,
      [styles.deleteBtn]: deleteBtn,
      [styles.addSection]: addSection,
      [styles.active]: active,
    })}
    onClick={onClick}
  >
    <X className={styles.cross} />
    {addSection && <div className={styles.addSectionInner}>段落</div>}
  </div>
);

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  addSection: PropTypes.bool,
  addQa: PropTypes.bool,
  deleteBtn: PropTypes.bool,
};

export default AddButton;
