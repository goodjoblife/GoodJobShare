import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cls from 'classnames';

import { Wrapper } from 'common/base';

import topStyles from './Top.module.css';
import styles from './EmailVerificationTop.module.css';

import Modal from '../../../common/Modal';
import VerifyEmailForm from '../../../EmailVerification/VerifyEmailForm';

import { getUserName } from '../../../../selectors/authSelector';

const EmailVerificationTop = ({
  isSentVerificationEmail,
  userName,
  submitEmail,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false));
  const openModal = useCallback(() => setIsModalOpen(true));

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
      {isModalOpen ? (
        <Modal isOpen={isModalOpen} close={closeModal} size="m">
          <VerifyEmailForm closeModal={closeModal} onSubmit={submitEmail} />
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

EmailVerificationTop.propTypes = {
  isSentVerificationEmail: PropTypes.bool,
  userName: PropTypes.string,
  submitEmail: PropTypes.func,
};

EmailVerificationTop.defaultProps = {
  submitEmail: email =>
    new Promise(resolve => setTimeout(() => resolve(email), 1500)).then(email =>
      console.log('submit email: ', email),
    ),
};

const mapStateToProps = (state, ownProps) => ({
  userName: getUserName(state),
});

const hoc = connect(mapStateToProps);

export default hoc(EmailVerificationTop);
