import React from 'react';
import PropTypes from 'prop-types';

import Button from 'common/button/Button';
import Heading from 'common/base/Heading';

import styles from './PlanCard.module.css';

const PlanCard = ({ title, description, amount, actionTitle, actionUrl }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading Tag="h3" size="sm">
          {title}
        </Heading>
      </div>
      <Button className={styles.actionButton}>{actionTitle}</Button>
    </div>
  );
};

PlanCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionTitle: PropTypes.string,
  actionUrl: PropTypes.string,
  amount: PropTypes.number,
};

export default PlanCard;
