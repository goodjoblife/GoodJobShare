import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Cross from '../images/x.svg';

import styles from './Modal.module.css';

const Modal = ({
  children,
  isOpen,
  hasClose,
  close,
  closableOnClickOutside,
  size,
  contentClassName,
}) => (
  <div
    className={cn(styles.modal, {
      [styles.isOpen]: isOpen,
    })}
    onClick={e => {
      if (closableOnClickOutside) {
        close();
      }
    }}
  >
    <div className={styles.inner}>
      <div className={cn(styles.container, styles[size])}>
        {hasClose ? (
          <div className={styles.close}>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={Cross}
              className={styles.close__icon}
              onClick={e => e.stopPropagation() || close()}
              alt="close"
            />
          </div>
        ) : null}
        <div
          className={cn(styles.content, contentClassName)}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  contentClassName: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  hasClose: PropTypes.bool,
  close: PropTypes.func.isRequired,
  closableOnClickOutside: PropTypes.bool,
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
