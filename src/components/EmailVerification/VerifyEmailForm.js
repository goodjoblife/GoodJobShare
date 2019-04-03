import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';
import P from 'common/base/P';
import TextInput from 'common/form/TextInput';
import Button from 'common/button/Button';

import styles from './VerifyEmailForm.module.css';

const stageMap = {
  FORM: 'FORM',
  SUCCESS: 'SUCCESS',
};

const VerifyEmailForm = ({ onSubmit }) => {
  const [emailValue, setEmailValue] = useState('');
  const [stage, setStage] = useState(stageMap.FORM);
  const handleEmailInput = useCallback(e => setEmailValue(e.target.value));
  const handleSubmit = useCallback(
    e => {
      onSubmit(emailValue)
        .then(email => console.log('submit email: ', email))
        .then(() => setStage(stageMap.SUCCESS));
      e.preventDefault();
    },
    [emailValue, setStage],
  );

  switch (stage) {
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
};

export default VerifyEmailForm;
