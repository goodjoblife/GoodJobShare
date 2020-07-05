import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import R from 'ramda';

import useFacebookLogin from 'hooks/login/useFacebookLogin';
import authStatus from '../../../constants/authStatus';
import styles from './SubmissionBlock.module.css';

const isAuthStatusConnected = R.compose(
  R.equals(authStatus.CONNECTED),
  auth => auth.get('status'),
);

const SubmissionBlock = ({ onSubmit }) => {
  const auth = useSelector(R.prop('auth'));
  const login = useFacebookLogin();
  const hasLoggedIn = useMemo(() => isAuthStatusConnected(auth), [auth]);
  const btnText = (hasLoggedIn ? '' : '以  f  認證，') + '送出資料並解鎖';
  const handleSubmit = useCallback(async () => {
    if (hasLoggedIn) {
      await onSubmit();
    } else {
      await login();
    }
  }, [hasLoggedIn, login, onSubmit]);
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
      </div>
    </div>
  );
};

SubmissionBlock.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SubmissionBlock;
