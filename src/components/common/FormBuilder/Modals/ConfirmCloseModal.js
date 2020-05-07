import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'common/Modal';
import styles from './styles.module.css';

const ResultModal = ({ onClose, onShareOthers, ...props }) => (
  <Modal {...props} size="xs" contentClassName={styles.content}>
    <div className={styles.title}>確定要離開？</div>
    <div className={styles.confirm}>離開之後資訊將會消失</div>
    <button className={styles.btn} onClick={onClose}>
      確定離開
    </button>
    <button className={styles.btn} onClick={onShareOthers}>
      分享其他資訊
    </button>
  </Modal>
);

ResultModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onShareOthers: PropTypes.func.isRequired,
};

export default ResultModal;
