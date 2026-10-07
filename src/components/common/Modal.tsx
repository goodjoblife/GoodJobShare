import cn from 'classnames';
import React from 'react';

import Cross from 'images/x.svg';

import styles from './Modal.module.css';

type ModalSize = 'xs' | 's' | 'm';

type InlineModalProps = {
  children?: React.ReactNode;
  hasClose?: boolean;
  close: () => void;
  size?: ModalSize;
  contentClassName?: string;
};

export const InlineModal: React.FC<InlineModalProps> = ({
  children,
  hasClose = true,
  close,
  size = 's',
  contentClassName,
}) => {
  return (
    <div className={cn(styles.container, styles[size])}>
      {hasClose ? (
        <div className={styles.close}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={Cross}
            className={styles.close__icon}
            onClick={(e): void => {
              e.stopPropagation();
              close();
            }}
            alt="close"
          />
        </div>
      ) : null}
      <div
        className={cn(styles.content, contentClassName)}
        onClick={(e): void => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

type ModalProps = InlineModalProps & {
  isOpen?: boolean;
  closableOnClickOutside?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  hasClose = true,
  close,
  closableOnClickOutside = false,
  size = 's',
  contentClassName,
}) => (
  <div
    className={cn(styles.modal, {
      [styles.isOpen]: isOpen,
    })}
    onClick={(): void => {
      if (closableOnClickOutside) {
        close();
      }
    }}
  >
    <div className={styles.inner}>
      <InlineModal
        hasClose={hasClose}
        close={close}
        size={size}
        contentClassName={contentClassName}
      >
        {children}
      </InlineModal>
    </div>
  </div>
);

export default Modal;

type InfoButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
};

const InfoButton: React.FC<InfoButtonProps> = ({ children, onClick }) => (
  <button className={styles.infoButton} onClick={onClick}>
    {children}
  </button>
);

export { InfoButton };
