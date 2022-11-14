import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubscriptionsSection.module.css';
import SubscriptionPlan from './SubscriptionPlan';

const SubscriptionPlanCollection = ({ plans, selectedId, setSelectedId }) => (
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

SubscriptionPlanCollection.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      duration: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
  selectedId: PropTypes.number.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};

export default SubscriptionPlanCollection;
