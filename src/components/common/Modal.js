import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Cross from '../images/x.svg';

import styles from './Modal.module.css';

const Modal = ({ children, isOpen, hasClose, close, size }) => (
  <div
    className={cn(styles.modal, {
      [styles.isOpen]: isOpen,
    })}
  >
    <div className={styles.inner}>
      <div className={cn(styles.container, styles[size])}>
        {hasClose ? (
          <div className={styles.close}>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={Cross}
              className={styles.close__icon}
              onClick={close}
              alt="close"
            />
          </div>
        ) : null}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  hasClose: PropTypes.bool,
  close: PropTypes.func,
  size: PropTypes.string,
};

Modal.defaultProps = {
  hasClose: true,
  size: 's',
};

export default Modal;

const InfoButton = ({ children, onClick }) => (
  <button className={styles.infoButton} onClick={onClick}>
    {children}
  </button>
);

InfoButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export { InfoButton };
