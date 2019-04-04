import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';
import P from 'common/base/P';
import TextInput from 'common/form/TextInput';
import Button from 'common/button/Button';
import Loading from 'common/Loader';

import styles from './VerifyEmailForm.module.css';

const stageMap = {
  FORM: 'FORM',
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
};

const VerifyEmailForm = ({ onSubmit, closeModal }) => {
  const [emailValue, setEmailValue] = useState('');
  const [stage, setStage] = useState(stageMap.FORM);
  const handleEmailInput = useCallback(e => setEmailValue(e.target.value));
  const handleSubmit = useCallback(
    e => {
      setStage(stageMap.LOADING);
      onSubmit(emailValue).finally(() => setStage(stageMap.SUCCESS));
      e.preventDefault();
    },
    [emailValue, setStage],
  );

  const handleReSubmit = useCallback(
    e => {
      setStage(stageMap.LOADING);

      onSubmit(emailValue).finally(() => setStage(stageMap.SUCCESS));
    },
    [emailValue],
  );

  switch (stage) {
    case stageMap.LOADING:
      return (
        <div
          style={{
            display: 'flex',
            alighItems: 'center',
            justifyContent: 'center',
            minHeight: '250px',
          }}
        >
          <Loading size="s" />
        </div>
      );
    case stageMap.SUCCESS:
      return (
        <section className={styles.root}>
          <Heading
            size="l"
            style={{
              marginBottom: '20px',
            }}
          >
            認證信已發送
          </Heading>
          <P
            size="l"
            style={{
              marginBottom: '35px',
            }}
          >
            認證完成後，重整此頁面，即可解鎖本篇文章
          </P>
          <Button
            circleSize="lg"
            btnStyle="black2"
            style={{
              marginBottom: '20px',
            }}
            onClick={closeModal}
          >
            關閉
          </Button>
          <div
            style={{
              display: 'flex',
              marginBottom: '20px',
            }}
          >
            <P size="s" style={{ marginRight: '2px' }}>
              沒收到嗎？
            </P>
            <Button
              style={{
                color: '#325bbd',
                fontSize: '0.9em',
                textDecoration: 'underline',
              }}
              onClick={handleReSubmit}
            >
              重發
            </Button>
          </div>
        </section>
      );
    case stageMap.FORM:
    default:
      return (
        <form onSubmit={handleSubmit} className={styles.root}>
          <Heading
            size="l"
            style={{
              marginBottom: '10px',
            }}
          >
            發送認證信
          </Heading>
          <P
            size="l"
            style={{
              marginBottom: '20px',
            }}
          >
            填寫你的 Email，有重大更新時我們將通知你。
          </P>
          <div className={styles.inputArea}>
            <label htmlFor="verifiy-email-input">
              <P
                size="s"
                style={{
                  marginBottom: '6px',
                }}
              >
                Email
              </P>
            </label>
            <TextInput
              id="verifiy-email-input"
              value={emailValue}
              onChange={handleEmailInput}
            />
          </div>
          <Button
            circleSize="lg"
            btnStyle="black2"
            style={{
              marginBottom: '10px',
            }}
          >
            發送認證信
          </Button>
        </form>
      );
  }
};

VerifyEmailForm.propTypes = {
  onSumbit: PropTypes.func,
  closeModal: PropTypes.func,
};

export default VerifyEmailForm;
