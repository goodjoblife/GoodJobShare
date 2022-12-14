import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import RoundCard from 'common/RoundCard';
import Button from 'common/button/Button';
import Heading from 'common/base/Heading';
import P from 'common/base/P';
import { subscriptionType } from 'constants/subscription';
import useToBuy from 'hooks/payment/useToBuy';

import styles from './PlanCard.module.css';
import { getActionTitle } from './helpers';

const getButtonType = type => {
  if (type === subscriptionType.submitData) {
    return 'yellow';
  }
  return 'hollowRed';
};

const PlanCard = ({ title, description, amount, actionUrl, type, skuId }) => {
  const actionTitle = getActionTitle(type);

  const history = useHistory();
  const redirectUrl = history.location.pathname;
  const toBuy = useToBuy(redirectUrl, skuId);
  return (
    <RoundCard>
      <div className={styles.content}>
        <Heading Tag="h3" size="sm" className={styles.title} bold>
          {title}
        </Heading>
        <P className={styles.description}>{description}</P>
        <div className={styles.amountSection}>
          <P className={styles.amount} bold>
            {amount}
          </P>
          <P className={styles.unit} bold>
            元
          </P>
        </div>
        <Button
          className={styles.actionButton}
          btnStyle={getButtonType(type)}
          onClick={toBuy}
        >
          {actionTitle}
        </Button>
      </div>
    </RoundCard>
  );
};

PlanCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  actionUrl: PropTypes.string,
  amount: PropTypes.number,
  skuId: PropTypes.string,
};

PlanCard.defaultProps = {
  title: '',
  description: '',
  actionUrl: '',
  amount: 0,
};

export default PlanCard;
