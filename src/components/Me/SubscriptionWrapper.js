import React from 'react';

import Heading from 'common/base/Heading';

import AuthMask from './AuthMask';
// import SubscriptionPageTab from './SubscriptionPageTab';
import styles from './SubscriptionWrapper.module.css';

// const tabs = [
//   {
//     id: 'my-current-subscription',
//     title: '我的方案',
//     panelId: 'my-current-subscription-panel',
//     url: '/me/subscriptions',
//   },
//   {
//     id: 'my-subscription-history',
//     title: '方案紀錄',
//     panelId: 'my-plan-history-panel',
//     url: '/me/subscriptions/history',
//   },
// ];

// const tabUrlMap = indexBy(prop('url'), tabs);

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
