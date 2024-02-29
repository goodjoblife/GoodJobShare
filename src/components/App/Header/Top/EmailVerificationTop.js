import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cls from 'classnames';

import { Wrapper } from 'common/base';
import Modal from 'common/Modal';

import { getUserName, getUserEmail } from 'selectors/authSelector';
import { sendVerifyEmail } from 'actions/emailVerify';
import topStyles from './Top.module.css';
import styles from './EmailVerificationTop.module.css';
import VerifyEmailForm from '../../../EmailVerification/VerifyEmailForm';

const EmailVerificationTop = ({
  isSentVerificationEmail,
  userName,
  userEmail,
  sendVerifyEmail,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false), [setIsModalOpen]);
  const openModal = useCallback(() => setIsModalOpen(true), [setIsModalOpen]);
  const submitEmail = useCallback(
    ({ email, redirectUrl }) => sendVerifyEmail({ email, redirectUrl }),
    [sendVerifyEmail],
  );

  return (
    <React.Fragment>
      <Wrapper
        size="l"
        className={cls(topStyles.inner, styles.wrapper)}
        onClick={openModal}
      >
        <div className={styles.heading}>
          {isSentVerificationEmail
            ? `✉️ 訂閱確認信已經發送到你的信箱，有收到嗎？`
            : `✉️ 訂閱 GoodJob，隨時掌握各公司的薪資福利資訊！`}
        </div>
        <div className={styles.button}>
          {isSentVerificationEmail ? '重發' : 'GO >>'}
        </div>
      </Wrapper>
      {isModalOpen ? (
        <Modal isOpen={isModalOpen} close={closeModal} size="m">
          <VerifyEmailForm
            userEmail={userEmail}
            closeModal={closeModal}
            onSubmit={submitEmail}
          />
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

EmailVerificationTop.propTypes = {
  isSentVerificationEmail: PropTypes.bool,
  userName: PropTypes.string,
  sendVerifyEmail: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  userName: getUserName(state),
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = {
  sendVerifyEmail,
};

const hoc = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default hoc(EmailVerificationTop);
