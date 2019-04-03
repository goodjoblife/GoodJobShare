import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';

import styles from './EmailVerificationTop.module.css';

import Modal from '../../../common/Modal';

import { getUserName } from '../../../../selectors/authSelector';

const EmailVerificationTop = ({ isSentVerificationEmail, userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = useCallback(() => setIsModalOpen(false));
  return (
    <React.Fragment>
      <div className={styles.heading}>
        {isSentVerificationEmail
          ? `✉️  ${userName} 你好，認證信已經發送到你的信箱，沒收到嗎？`
          : `✉️ ${userName} 你好，認證你的 Email，隨時掌握 GoodJob 最新消息！`}
      </div>
      <div className={styles.button}>
        {isSentVerificationEmail ? '重發' : 'GO >>'}
      </div>
      <Modal isOpen={isModalOpen} close={closeModal}>
        test
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userName: getUserName(state),
});

const hoc = connect(mapStateToProps);

export default hoc(EmailVerificationTop);
