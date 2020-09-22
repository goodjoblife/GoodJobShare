import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useLogin } from 'hooks/login';
import styles from './SubmissionBlock.module.css';

const SubmissionBlock = ({ onSubmit }) => {
  const [isLoggedIn, login] = useLogin();
  const btnText = (isLoggedIn ? '' : '登入帳號，以') + '送出資料並解鎖';
  const handleSubmit = useCallback(async () => {
    if (isLoggedIn) {
      await onSubmit();
    } else {
      login();
    }
  }, [isLoggedIn, login, onSubmit]);
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleSubmit}>
        {btnText}
      </button>
      <div className={styles.privacyPolicy}>
        我分享的是真實資訊，並遵守中華民國法令，以及本站
        <Link className={styles.link} to="/user-terms" target="_blank">
          使用者條款
        </Link>
        以及
        <Link className={styles.link} to="/guidelines" target="_blank">
          發文留言規則
        </Link>
      </div>
    </div>
  );
};

SubmissionBlock.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SubmissionBlock;
