import React from 'react';
import PropTypes from 'prop-types';
import PlanCard from '../../PlanPage/PlanCard';
import { subscriptionTypes } from 'constants/subscription';

const SubscriptionPlan = ({
  className,
  title,
  description,
  amount,
  type,
  active,
  onChange,
}) => (
  <label className={className}>
    <input
      name="plan"
      type="radio"
      style={{ display: 'none' }}
      onChange={onChange}
    ></input>
    <PlanCard
      title={title}
      description={description}
      amount={amount}
      type={type}
      hideCta
      checked={active}
    />
  </label>
);

SubscriptionPlan.propTypes = {
  active: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(subscriptionTypes).isRequired,
};

export default SubscriptionPlan;
