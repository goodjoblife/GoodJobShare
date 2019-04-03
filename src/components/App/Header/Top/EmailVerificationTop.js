import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import cls from 'classnames';

import { Wrapper } from 'common/base';

import topStyles from './Top.module.css';
import styles from './EmailVerificationTop.module.css';

import Modal from '../../../common/Modal';
import VerifyEmailForm from '../../../EmailVerification/VerifyEmailForm';

import { getUserName } from '../../../../selectors/authSelector';

const EmailVerificationTop = ({ isSentVerificationEmail, userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => {
    console.log('modal false');
    setIsModalOpen(false);
  });
  const openModal = useCallback(() => {
    console.log('modal true');
    setIsModalOpen(true);
  });
  return (
    <React.Fragment>
      <Wrapper
        size="l"
        className={cls(topStyles.inner, styles.wrapper)}
        onClick={openModal}
      >
        <div className={styles.heading}>
          {isSentVerificationEmail
            ? `✉️  ${userName} 你好，認證信已經發送到你的信箱，沒收到嗎？`
            : `✉️ ${userName} 你好，認證你的 Email，隨時掌握 GoodJob 最新消息！`}
        </div>
        <div className={styles.button}>
          {isSentVerificationEmail ? '重發' : 'GO >>'}
        </div>
      </Wrapper>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <VerifyEmailForm />
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userName: getUserName(state),
});

const hoc = connect(mapStateToProps);

export default hoc(EmailVerificationTop);
