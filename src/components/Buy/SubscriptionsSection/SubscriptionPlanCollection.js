import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubscriptionsSection.module.css';
import SubscriptionPlan from './SubscriptionPlan';
import { subscriptionTypes } from 'constants/subscription';

const SubscriptionPlanCollection = ({ plans, selectedId, setSelectedId }) => (
  <div className={styles.plans}>
    {plans.map(plan => (
      <SubscriptionPlan
        key={plan.skuId}
        className={styles.plan}
        title={plan.title}
        description={plan.description}
        amount={plan.amount}
        type={plan.type}
        active={selectedId === plan.skuId}
        onChange={e => e.target.checked && setSelectedId(plan.skuId)}
      />
    ))}
  </div>
);

SubscriptionPlanCollection.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      skuId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(subscriptionTypes).isRequired,
    }),
  ),
  selectedId: PropTypes.string,
  setSelectedId: PropTypes.func.isRequired,
};

export default SubscriptionPlanCollection;
