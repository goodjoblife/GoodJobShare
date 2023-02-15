import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubscriptionsSection.module.css';
import SubscriptionPlan from './SubscriptionPlan';

const SubscriptionPlanCollection = ({ plans, selectedId, setSelectedId }) => (
  <div className={styles.plans}>
    {plans.map(plan => (
      <SubscriptionPlan
        key={plan.skuId}
        className={styles.plan}
        title={plan.title}
        amount={plan.amount}
        duration={plan.duration}
        active={selectedId === plan.skuId}
        onChange={e => e.target.checked && setSelectedId(plan.id)}
      />
    ))}
  </div>
);

SubscriptionPlanCollection.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      skuId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      duration: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
  selectedId: PropTypes.string,
  setSelectedId: PropTypes.func.isRequired,
};

export default SubscriptionPlanCollection;
