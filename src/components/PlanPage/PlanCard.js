import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

const PlanCard = ({ title, description, amount, type, skuId }) => {
  const actionTitle = getActionTitle(type);

  const history = useHistory();
  const redirectUrl = history.location.pathname;
  const { toBuy, actionUrl } = useToBuy(redirectUrl, skuId, false);
  const onButtonClick = useCallback(
    evt => {
      evt.preventDefault();
      toBuy();
    },
    [toBuy],
  );

  const isPurchasePlan = type === subscriptionType.buySubscription;

  const linkUrl = isPurchasePlan ? actionUrl : '/share';

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
        <Link to={linkUrl} onClick={isPurchasePlan ? onButtonClick : null}>
          <Button
            className={styles.actionButton}
            btnStyle={getButtonType(type)}
          >
            {actionTitle}
          </Button>
        </Link>
      </div>
    </RoundCard>
  );
};

PlanCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  amount: PropTypes.number,
  skuId: PropTypes.string,
};

PlanCard.defaultProps = {
  title: '',
  description: '',
  amount: 0,
};

export default PlanCard;
