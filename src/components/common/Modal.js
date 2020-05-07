import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Cross from '../images/x.svg';

import styles from './Modal.module.css';
import { compose, withHandlers } from 'recompose';

const Modal = ({
  children,
  isOpen,
  hasClose,
  close,
  size,
  onClickOutside,
  contentClassName,
}) => (
  <div
    className={cn(styles.modal, {
      [styles.isOpen]: isOpen,
    })}
    onClick={onClickOutside}
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
  size: PropTypes.string,
  onClickOutside: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  hasClose: true,
  size: 's',
};

const enhanceModal = compose(
  withHandlers({
    onClickOutside: ({ closableOnClickOutside, close }) => () => {
      if (closableOnClickOutside) {
        close();
      }
    },
  }),
);

export default enhanceModal(Modal);

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
