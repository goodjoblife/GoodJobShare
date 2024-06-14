import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router';

import Heading from 'common/base/Heading';
import P from 'common/base/P';
import TextInput from 'common/form/TextInput';
import Button from 'common/button/Button';
import Loading from 'common/Loader';

import { validateEmail } from 'utils/dataCheckUtil';

import styles from './VerifyEmailForm.module.css';

const stageMap = {
  FORM: 'FORM',
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
};

const VerifyEmailForm = ({
  userEmail,
  onSubmit,
  closeModal,
  location: { pathname },
}) => {
  const [emailValue, setEmailValue] = useState(userEmail || '');
  const [stage, setStage] = useState(stageMap.FORM);
  const [emailValueFormatValid, setEmailValueFormatValid] = useState(true);

  const handleEmailInput = useCallback(
    e => {
      setEmailValue(e.target.value);
      setEmailValueFormatValid(true);
    },
    [setEmailValue, setEmailValueFormatValid],
  );
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!validateEmail(emailValue)) {
        setEmailValueFormatValid(false);
      } else {
        setStage(stageMap.LOADING);
        onSubmit({ email: emailValue, redirectUrl: pathname }).finally(() =>
          setStage(stageMap.SUCCESS),
        );
      }
    },
    [setEmailValueFormatValid, onSubmit, emailValue, setStage, pathname],
  );

  const handleReSubmit = useCallback(
    e => {
      if (!validateEmail(emailValue)) {
        setEmailValueFormatValid(false);
      } else {
        setStage(stageMap.LOADING);

        onSubmit({ email: emailValue, redirectUrl: pathname }).finally(() =>
          setStage(stageMap.SUCCESS),
        );
      }
    },
    [onSubmit, emailValue, pathname],
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
            訂閱確認信已發送
          </Heading>
          <P
            size="l"
            style={{
              marginBottom: '35px',
            }}
          >
            認證完成後，即可隨時掌握最新的薪資福利、面試經驗資訊
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
            訂閱 GoodJob
          </Heading>
          <P
            size="l"
            style={{
              marginBottom: '20px',
            }}
          >
            填寫你的 Email，立即掌握最新的薪資福利、面試經驗資訊
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
            <div
              className={
                emailValueFormatValid
                  ? cn(styles.hidden, styles.warningText)
                  : styles.warningText
              }
            >
              E-mail 格式錯誤
            </div>
          </div>
          <Button
            circleSize="lg"
            btnStyle="black2"
            style={{
              marginBottom: '10px',
            }}
          >
            立即訂閱
          </Button>
        </form>
      );
  }
};

VerifyEmailForm.propTypes = {
  closeModal: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  userEmail: PropTypes.string,
};

export default withRouter(VerifyEmailForm);
