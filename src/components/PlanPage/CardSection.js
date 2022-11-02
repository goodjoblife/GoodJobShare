import React from 'react';
import PropTypes from 'prop-types';

import PlanCard from './PlanCard';
import styles from './CardSection.module.css';
import { getColumns, getActionTitle } from './helpers';

const CardSection = ({ plans, title }) => {
  return (
    <div
      className={styles.container}
      style={{
        gridTemplateColumns: `repeat(${getColumns(plans)}, 1fr)`,
      }}
    >
      {plans.map(plan => (
        <PlanCard
          key={plan.skuId}
          title={plan.title}
          description={plan.description}
          amount={plan.amount}
          actionTitle={getActionTitle(plan)}
        />
      ))}
    </div>
  );
};

CardSection.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default CardSection;
