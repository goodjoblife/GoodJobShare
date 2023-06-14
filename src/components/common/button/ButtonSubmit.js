import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Modal from 'common/Modal';

import WhyFacebookAuth from './WhyFacebookAuth';
import styles from './ButtonSubmit.module.css';
import { useState } from 'react';
import { useLogin } from 'hooks/login';

const getWhyFacebookAuth = onClick => <WhyFacebookAuth buttonClick={onClick} />;

const ButtonSubmit = ({ text, onSubmit, disabled }) => {
  const [isOpen, setOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [hasLoggedIn, login] = useLogin();

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {hasLoggedIn ? (
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
            <pre>{`登入以${text}`}</pre>
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
};

export default ButtonSubmit;
