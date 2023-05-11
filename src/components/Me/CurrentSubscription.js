import React from 'react';
import PropTypes from 'prop-types';

import PlanCard from '../PlanPage/PlanCard';

import styles from './CurrentSubscription.module.css';

const CurrentSubscription = ({ subscriptionPlan, expiredAt }) => {
  return (
    <div>
      <div className={styles.card}>
        <PlanCard
          title={subscriptionPlan.title}
          description={subscriptionPlan.description}
          amount={subscriptionPlan.amount}
          type={subscriptionPlan.type}
          hideCta={true}
        />
      </div>
      {expiredAt}
    </div>
  );
};

CurrentSubscription.propTypes = {
  subscriptionPlan: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.number,
  }),
  expiredAt: PropTypes.string,
};

export default CurrentSubscription;
