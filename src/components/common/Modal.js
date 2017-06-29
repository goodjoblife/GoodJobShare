import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Cross from '../images/x.svg';

import styles from './Modal.module.css';

const Modal = ({ children, isOpen, hasClose, close }) => (
  <div
    className={
      cn(styles.modal, { [styles.isOpen]: isOpen })
    }
  >
    <div className={styles.inner}>
      <div className={styles.content}>
        {
          hasClose ?
            <div className={styles.close}>
              <Cross
                className={styles.close__icon}
                onClick={close}
              />
            </div> : null
        }
        {children}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  hasClose: PropTypes.bool,
  close: PropTypes.func,
};

Modal.defaultProps = {
  hasClose: true,
};

export default Modal;
