import React from 'react';
import PropTypes from 'prop-types';

import Warning from 'common/icons/Warning';
import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';

import styles from './VerificationPage.module.css';

const VerificationFailure = ({ sendVerificationCode }) => (
  <React.Fragment>
    <Warning className={styles.warning} />
    <Heading
      size="m"
      style={{
        marginBottom: '20px',
      }}
    >
      Email 認證失敗
    </Heading>
    <P
      size="m"
      style={{
        marginBottom: '28px',
      }}
    >
      可能你的網路不穩，或是系統忙線中，請重新再按一次驗證按鈕。
    </P>
    <Button
      circleSize="lg"
      btnStyle="black2"
      onClick={sendVerificationCode}
      style={{
        marginBottom: '10px',
      }}
    >
      重新驗證
    </Button>
  </React.Fragment>
);

VerificationFailure.propTypes = {
  sendVerificationCode: PropTypes.func,
};

export default VerificationFailure;
