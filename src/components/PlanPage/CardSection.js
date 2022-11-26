import React from 'react';
import PropTypes from 'prop-types';

import PlanCard from './PlanCard';
import styles from './CardSection.module.css';
import { getColumns } from './helpers';

const CardSection = ({ plans }) => {
  return (
    <div>
      <div
        className={styles.cardContainer}
        style={{
          gridTemplateColumns: `repeat(${getColumns(plans)}, 1fr)`,
        }}
      >
        {plans.map(plan => (
          <div key={plan.skuId} className={styles.cardWrapper}>
            <PlanCard
              title={plan.title}
              description={plan.description}
              amount={plan.amount}
              actionUrl={plan.url}
              type={plan.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

CardSection.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.object),
};

export default CardSection;
