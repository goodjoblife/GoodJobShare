import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Modal from 'common/Modal';
import styles from './styles.module.css';

const ConfirmModal = ({
  title,
  subtitle,
  description,
  confirmText,
  confirm,
  shareText,
  share,
  ...props
}) => (
  <Modal {...props} size="xs" contentClassName={styles.content}>
    <div className={styles.title}>{title}</div>
    <div className={cn(styles.subTitle, { [styles.hidden]: !subtitle })}>
      {subtitle}
    </div>
    <div className={styles.description}>{description}</div>
    <button className={styles.btn} onClick={confirm}>
      {confirmText}
    </button>
    <button
      className={cn(styles.btn, { [styles.hidden]: !shareText })}
      onClick={share}
    >
      {shareText}
    </button>
  </Modal>
);

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  shareText: PropTypes.string,
  share: PropTypes.func,
};

export default ConfirmModal;
