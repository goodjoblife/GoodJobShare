import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'common/button/Button';
import Heading from 'common/base/Heading';
import P from 'common/base/P';

import styles from './PlanCard.module.css';
import { getActionTitle } from './helpers';

const getButtonType = type => {
  if (type === 'SubmitData') {
    return 'yellow';
  }
  return 'hollowRed';
};

const PlanCard = ({ title, description, amount, actionUrl, type }) => {
  const actionTitle = getActionTitle(type);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading Tag="h3" size="sm" className={styles.title} bold>
          {title}
        </Heading>
        <P className={styles.description}>{description}</P>
        <div className={styles['amount-section']}>
          <P className={styles.amount} bold>
            {amount}
          </P>
          <P className={styles.unit} bold>
            元
          </P>
        </div>
        <Link to={actionUrl}>
          <Button
            className={styles['action-button']}
            btnStyle={getButtonType(type)}
          >
            {actionTitle}
          </Button>
        </Link>
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
