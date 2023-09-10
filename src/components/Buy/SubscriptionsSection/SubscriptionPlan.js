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
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(subscriptionTypes).isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SubscriptionPlan;
