import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import RoundCard from 'common/RoundCard';
import { formatSalaryType } from 'common/formatter';
import styles from './SubscriptionsSection.module.css';

const SubscriptionPlan = ({
  className,
  title,
  amount,
  duration,
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
    <RoundCard className={styles.content} checked={active}>
      <P className={styles.title} size="l" bold>
        {title}
      </P>
      <P className={styles.subtitle} size="l">
        解鎖全站 {duration.amount} 個{formatSalaryType(duration.type)}
      </P>
      <P bold>
        <span className={styles.price}>{amount}</span>元
      </P>
    </RoundCard>
  </label>
);

SubscriptionPlan.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  duration: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SubscriptionPlan;
