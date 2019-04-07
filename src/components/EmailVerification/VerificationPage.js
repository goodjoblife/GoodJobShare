import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import VerificationSuccess from './VerificationSuccess';

// import styles from './VerificationPage.module.css';

const VERIFY_STATUS = {
  NOT_VERIFITED: 'NOT_VERIFITED',
  LOADING: 'LOADING',
  VERIFY_SUCCESS: 'VERIFY_SUCCESS',
  VERIFY_FAILURE: 'VERIFY_FAILURE',
};

const VerificationPage = ({
  match: {
    params: { verificationCode },
  },
  verifyWithCode,
}) => {
  const [verifyStatus, setVerifyStatus] = useState(VERIFY_STATUS.NOT_VERIFITED);
  const sendVerificationCode = useCallback(
    code => {
      setVerifyStatus(VERIFY_STATUS.LOADING);
      verifyWithCode(code)
        .then(() => setVerifyStatus(VERIFY_STATUS.VERIFY_SUCCESS))
        .catch(e => {
          setVerifyStatus(VERIFY_STATUS.VERIFY_FAILURE);
          console.error(e);
        });
    },
    [verifyWithCode],
  );

  useEffect(() => {
    sendVerificationCode(verificationCode);
  }, [verifyWithCode]);

  switch (verifyStatus) {
    case VERIFY_STATUS.VERIFY_SUCCESS:
      return <VerificationSuccess />;
    case VERIFY_STATUS.VERIFY_FAILURE:
    case VERIFY_STATUS.NOT_VERIFITED:
    default:
      return null;
  }
};

VerificationPage.propTypes = {
  match: PropTypes.shape({
    parmas: PropTypes.shape({
      verificationCode: PropTypes.string,
    }),
  }),
  verifyWithCode: PropTypes.func,
};

VerificationPage.defaultProps = {
  verifyWithCode: verificationCode =>
    new Promise(resolve =>
      setTimeout(() => resolve(verificationCode), 1500),
    ).then(verificationCode =>
      console.log('submit verificationCode: ', verificationCode),
    ),
};

export default VerificationPage;
