import React from 'react';

import Heading from 'common/base/Heading';
import TabLinkGroup from 'common/TabLinkGroup';

import AuthMask from './AuthMask';

import styles from './SubscriptionWrapper.module.css';

const options = [
  {
    label: '我的方案',
    to: '/me/subscriptions/current',
  },
  {
    label: '方案紀錄',
    to: '/me/subscriptions',
  },
];

const SubscriptionWrapper = ({ children }) => {
  return (
    <AuthMask title="登入以查看我的方案">
      <div className={styles.container}>
        <Heading as="h1" style={{ marginBottom: '48px' }}>
          我的方案
        </Heading>
        <TabLinkGroup className={styles.tabs} options={options} />
        <div>
          <div style={{ display: 'inline-block' }}>{children}</div>
        </div>
      </div>
    </AuthMask>
  );
};

export default SubscriptionWrapper;
