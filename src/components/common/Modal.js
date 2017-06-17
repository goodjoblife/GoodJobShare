import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Cross from '../images/x.svg';

import styles from './Modal.module.css';

const Modal = ({ children, isOpen, close }) => (
  <div
    className={
      cn(styles.modal, { [styles.isOpen]: isOpen })
    }
  >
    <div className={styles.inner}>
      <div className={styles.content}>
        <div className={styles.close}>
          <Cross
            className={styles.close__icon}
            onClick={close}
          />
        </div>
        {children}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

export default Modal;
