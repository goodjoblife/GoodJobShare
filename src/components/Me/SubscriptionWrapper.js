import React from 'react';

import { Section, Wrapper } from 'common/base';
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

const SubscriptionWrapper = ({ children }) => (
  <Section paddingTop paddingBottom>
    <Wrapper size="l">
      <AuthMask title="登入以查看我的方案">
        <Heading as="h1" marginBottom>
          我的方案
        </Heading>
        <TabLinkGroup className={styles.tabs} options={options} />
        <div>
          <div style={{ display: 'inline-block' }}>{children}</div>
        </div>
      </AuthMask>
    </Wrapper>
  </Section>
);

export default SubscriptionWrapper;
