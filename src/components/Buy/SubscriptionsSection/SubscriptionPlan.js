import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import RoundCard from 'common/RoundCard';

const SubscriptionPlan = ({
  className,
  name,
  price,
  duration,
  active,
  onClick,
}) => (
  <RoundCard className={className} checked={active} onClick={onClick}>
    <P bold>{name}</P>
    <P bold>{price}元</P>
    <P bold>
      解鎖全站 {duration.amount} 個{duration.unit}
    </P>
  </RoundCard>
);

SubscriptionPlan.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  duration: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default SubscriptionPlan;
