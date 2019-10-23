import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Modal from '../Modal.js';
import styles from './LoginModal.module.css';
import authStatus from '../../../constants/authStatus';
import { GOOGLE_APP_ID } from '../../../config';
import { withPermission } from '../../common/permission-context';
import { withFB } from '../../common/facebook';
import { withGoogle } from '../../common/google';
import { loginWithFB } from '../../../actions/auth';

const LoginModal = ({
  onFbBtnClick,
  loginWithGoogle,
  FB,
  loginModal,
  isOpen,
  close,
}) => {
  useEffect(() => {
    if (!window || window.gapi) return;
    window.initGoogle = () => {
      const gapi = window.gapi;
      gapi.load('auth2', () => {
        gapi.auth2.init();
      });
    };
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=initGoogle';
    document.body.appendChild(script);
  }, []);

  return (
    <Modal isOpen={isOpen} hasColose close={close} closableOnClickOutside>
      <div className={styles.container}>
        <Helmet>
          <meta name="google-signin-client_id" content={GOOGLE_APP_ID} />
        </Helmet>
        <h2 style={{ fontSize: '1.4em' }}>登入</h2>
        <div className={styles.modal}>
          <button
            className={styles['btn-facebook']}
            onClick={async () => {
              if ((await onFbBtnClick(FB)) === authStatus.CONNECTED) {
                loginModal.setIsOpen(false);
              }
            }}
          >
            Facebook 登入
          </button>
          <button
            className={styles['btn-google']}
            onClick={async () => {
              if (await loginWithGoogle()) {
                loginModal.setIsOpen(false);
              }
            }}
          >
            Google 登入
          </button>
          <p className={styles['login-tips']}>
            為了避免使用者大量輸入假資訊，我們會以你的帳戶做驗證。但別擔心！您的帳戶資訊不會以任何形式被揭露、顯示。
          </p>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFbBtnClick: loginWithFB,
    },
    dispatch,
  );

const hoc = compose(
  withPermission,
  withFB,
  withGoogle,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(hoc(LoginModal));
