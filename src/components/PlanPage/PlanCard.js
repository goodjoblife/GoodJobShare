import React from 'react';
import PropTypes from 'prop-types';

import Button from 'common/button/Button';
import Heading from 'common/base/Heading';
import P from 'common/base/P';

import styles from './PlanCard.module.css';
import { getActionTitle } from './helpers';

const PlanCard = ({ title, description, amount, actionUrl, type }) => {
  const actionTitle = getActionTitle(type);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading Tag="h3" size="sm">
          {title}
        </Heading>
        <P>{description}</P>
        <P>{`${amount} 元`}</P>
        <Button className={styles['action-button']}>{actionTitle}</Button>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  actionUrl: PropTypes.string,
  amount: PropTypes.number,
};

PlanCard.defaultProps = {
  title: '',
  description: '',
  actionUrl: '',
  amount: 0,
};

export default PlanCard;
