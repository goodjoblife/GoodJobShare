import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cn from 'classnames';
import Modal from 'common/Modal';
import authStatus from 'constants/authStatus';

import WhyFacebookAuth from './WhyFacebookAuth';
import styles from './ButtonSubmit.module.css';
import { useState } from 'react';

// TODO: deprecated, should use hooks or selector to get isLogin
const isLogin = auth => auth.status === authStatus.CONNECTED;

const getWhyFacebookAuth = onClick => <WhyFacebookAuth buttonClick={onClick} />;

const ButtonSubmit = ({ text, onSubmit, disabled, auth, login }) => {
  const [isOpen, setOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {isLogin(auth) ? (
        <button
          className={styles.container}
          onClick={onSubmit}
          disabled={disabled}
        >
          {text}
        </button>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <button
            className={styles.container}
            onClick={login}
            disabled={disabled}
          >
            <pre>{`以  f  認證，${text}`}</pre>
          </button>
          <div
            style={{
              marginTop: '21px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setOpen(true);
              return setFeedback(getWhyFacebookAuth(() => setOpen(false)));
            }}
          >
            <p className={cn('pMbold', styles.whyFB)}>
              為什麼需要 Facebook 帳戶驗證？
            </p>
          </div>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        close={() => setOpen(!isOpen)}
        hasClose={false}
        closableOnClickOutside
      >
        {feedback}
      </Modal>
    </div>
  );
};

ButtonSubmit.propTypes = {
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  auth: ImmutablePropTypes.map,
  login: PropTypes.func.isRequired,
};

export default ButtonSubmit;
