import React, { useState } from 'react';
import cn from 'classnames';
import Checkbox from 'common/form/Checkbox';
import { Section, P } from 'common/base';
import { Link } from 'react-router-dom';
import styles from './SubscriptionsSection.module.css';

const SubscriptionPlan = ({
  className,
  name,
  price,
  duration,
  active,
  onClick,
}) => (
  /* TODO: Component guide */
  <button
    className={cn(className, { [styles.active]: active })}
    onClick={onClick}
  >
    <P bold>{name}</P>
    <P bold>{price}元</P>
    <P bold>
      解鎖全站 {duration.amount} 個{duration.unit}
    </P>
  </button>
);

const SubscriptionPlans = ({ plans, selectedId, setSelectedId }) => {
  return (
    <div className={styles.plans}>
      {plans.map(plan => (
        <SubscriptionPlan
          key={plan.id}
          className={styles.plan}
          name={plan.name}
          price={plan.price}
          duration={plan.duration}
          active={selectedId === plan.id}
          onClick={e => setSelectedId(plan.id)}
        />
      ))}
    </div>
  );
};

const plans = [
  {
    id: 'month',
    name: '包月方案',
    price: 99,
    duration: { amount: 1, unit: 'MONTH' },
  },
  {
    id: 'quarter',
    name: '包季方案',
    price: 149,
    duration: { amount: 3, unit: 'MONTH' },
  },
];

export default () => {
  const [selectedId, setSelectedId] = useState('month');
  const [tosChecked, setTosChecked] = useState(false);
  return (
    <Section paddingTop>
      <SubscriptionPlans
        plans={plans}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <Section paddingTop>
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
