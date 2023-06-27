import React from 'react';

import Heading from 'common/base/Heading';

import AuthMask from './AuthMask';

import styles from './SubscriptionWrapper.module.css';

const SubscriptionWrapper = ({ children }) => {
  return (
    <AuthMask title="登入以查看我的方案">
      <div className={styles.container}>
        <Heading as="h1" style={{ marginBottom: '48px' }}>
          我的方案
        </Heading>
        <div style={{ display: 'inline-block' }}>{children}</div>
      </div>
    </AuthMask>
  );
};

export default SubscriptionWrapper;
