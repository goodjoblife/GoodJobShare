import React, { useState } from 'react';
import { Section, P, Link } from 'common/base';
import SubscriptionPlanCollection from './SubscriptionPlanCollection';
import styles from './SubscriptionsSection.module.css';

const plans = [
  {
    id: 'month',
    name: '包月方案',
    price: 99,
    duration: { amount: 1, unit: 'month' },
  },
  {
    id: 'quarter',
    name: '包季方案',
    price: 149,
    duration: { amount: 3, unit: 'month' },
  },
];

const SubscriptionsSection = () => {
  const [selectedId, setSelectedId] = useState(plans[0].id);
  return (
    <Section paddingTop>
      <SubscriptionPlanCollection
        plans={plans}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <Section className={styles.captain}>
        <P>解鎖範圍：全站 8,393 筆面試、薪資資料，及期間內新增的資料</P>
        <P>使用期間：現在 ~ 2022.01.30 23:59</P>
        <P>
          付款及同意<Link to="/user-terms">使用條款</Link>
        </P>
      </Section>
    </Section>
  );
};

export default SubscriptionsSection;
