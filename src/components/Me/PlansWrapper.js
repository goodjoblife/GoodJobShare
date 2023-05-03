import React from 'react';
import { useLocation } from 'react-router-dom';
import { indexBy, prop } from 'ramda';

import Heading from 'common/base/Heading';

import PlanPageTab from './PlanPageTab';
import styles from './PlansWrapper.module.css';

const tabs = [
  {
    id: 'my-current-subscription',
    title: '我的方案',
    panelId: 'my-current-subscription-panel',
    url: '/me/plans',
  },
  {
    id: 'my-plan-history',
    title: '方案紀錄',
    panelId: 'my-plan-history-panel',
    url: '/me/plans-history',
  },
];

const tabUrlMap = indexBy(prop('url'), tabs);

const PlansWrapper = ({ children }) => {
  const location = useLocation();

  const currentTabId = tabUrlMap[location.pathname].id;

  return (
    <div className={styles.container}>
      <Heading as="h1">方案</Heading>
      <div style={{ marginTop: '18px', marginBottom: '48px' }}>
        <PlanPageTab tabs={tabs} currentTabId={currentTabId} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PlansWrapper;
