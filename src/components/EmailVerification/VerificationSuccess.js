import React from 'react';
import { Link } from 'react-router-dom';

import Checked from 'common/icons/Checked';
import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';

import styles from './VerificationPage.module.css';

const VerificationSuccess = () => (
  <React.Fragment>
    <Checked className={styles.checked} />
    <Heading
      size="m"
      style={{
        marginBottom: '20px',
      }}
    >
      Email 認證成功
    </Heading>
    <P
      size="m"
      style={{
        marginBottom: '28px',
      }}
    >
      感謝你的驗證，未來有重大更新我們將 Email 通知你。
    </P>
    <Link to="/" title="GoodJob 職場透明化運動">
      <Button
        circleSize="lg"
        btnStyle="black2"
        style={{
          marginBottom: '10px',
        }}
      >
        返回首頁
      </Button>
    </Link>
  </React.Fragment>
);

VerificationSuccess.propTypes = {};

export default VerificationSuccess;
