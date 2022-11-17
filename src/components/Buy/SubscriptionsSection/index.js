import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from 'common/form/Checkbox';
import { Section, P } from 'common/base';
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
  const [tosChecked, setTosChecked] = useState(false);
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
      </Section>
      <Checkbox
        label={
          <span>
            我同意 <Link to="/user-terms">使用條款</Link>
          </span>
        }
        checked={tosChecked}
        value="tos"
        onChange={e => setTosChecked(e.target.checked)}
      />
    </Section>
  );
};

export default SubscriptionsSection;
