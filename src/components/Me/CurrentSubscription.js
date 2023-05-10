import React from 'react';
import PropTypes from 'prop-types';

import PlanCard from '../PlanPage/PlanCard';

const CurrentSubscription = ({ subscriptionPlan, expiredTime }) => {
  return (
    <div>
      <PlanCard
        title={subscriptionPlan.title}
        description={subscriptionPlan.description}
        amount={subscriptionPlan.amount}
        type={subscriptionPlan.type}
        hideCta={true}
      />
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
};

export default CurrentSubscription;
