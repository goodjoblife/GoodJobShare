import React from 'react';
import PropTypes from 'prop-types';

import P from 'common/base/P';

import PlanCard from './PlanCard';
import styles from './CardSection.module.css';
import { getColumns } from './helpers';

const getTitleClassName = type => {
  if (type === 'SubmitData') {
    return 'title-submit-data';
  }

  return 'title-buy-subscription';
};

const CardSection = ({ plans, title, type }) => {
  return (
    <div>
      <P
        className={styles[getTitleClassName(type)]}
        size="m"
        style={{
          marginBottom: '12px',
        }}
      >
        {title}
      </P>
      <div
        className={styles['card-container']}
        style={{
          gridTemplateColumns: `repeat(${getColumns(plans)}, 1fr)`,
        }}
      >
        {plans.map(plan => (
          <div key={plan.skuId} className={styles['card-wrapper']}>
            <PlanCard
              title={plan.title}
              description={plan.description}
              amount={plan.amount}
              actionUrl={plan.url}
              type={type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

CardSection.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  type: PropTypes.string,
};

export default CardSection;
