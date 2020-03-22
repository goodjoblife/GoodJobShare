import React from 'react';

import Modal from 'common/Modal';
import styles from './SuccessModal.module.css';

const SuccessModal = props => (
  <Modal {...props} size="ss">
    <div className={styles.title}>上傳成功</div>
    <div className={styles.subTitle}>你已解鎖全站資訊 48 小時</div>
    <div className={styles.description}>
      感謝你分享你的資訊，台灣的職場因為有你而變得更好！
    </div>
  </Modal>
);
export default SuccessModal;
