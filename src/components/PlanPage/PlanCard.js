import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

const PlanCard = ({
  title,
  description,
  amount,
  type,
  skuId,
  hideCta,
  checked,
}) => {
  const actionTitle = getActionTitle(type);

  const { toBuy, actionUrl } = useToBuy('/', skuId);
  const onButtonClick = useCallback(
    evt => {
      evt.preventDefault();
      toBuy();
    },
    [toBuy],
  );

  const isSubmitData = type === subscriptionType.submitData;

  const linkUrl = isSubmitData ? '/share' : actionUrl;

  return (
    <RoundCard className={styles.container} checked={checked}>
      <div className={styles.content}>
        <div className={styles.topArea}>
          <Heading Tag="h3" size="sm" className={styles.title} bold>
            {title}
          </Heading>
          <P className={styles.description}>{description}</P>
        </div>
        <div className={styles.amountSection}>
          <P className={styles.amount} bold>
            {amount}
          </P>
          <P className={styles.unit} bold>
            元
          </P>
        </div>
        {!hideCta && (
          <div className={styles.bottomArea}>
            <div className={styles.helperContainer}>
              {isSubmitData && (
                <P className={styles.helperText} size="s">
                  \ 留下你的資料幫助其他人 /
                </P>
              )}
            </div>
            <Link to={linkUrl} onClick={isSubmitData ? null : onButtonClick}>
              <Button
                className={styles.actionButton}
                btnStyle={getButtonType(type)}
                circleSize="lg"
              >
                {actionTitle}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </RoundCard>
  );
};

PlanCard.propTypes = {
  amount: PropTypes.number,
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string,
  hideCta: PropTypes.bool,
  skuId: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};

PlanCard.defaultProps = {
  title: '',
  description: '',
  amount: 0,
  skuId: '',
  hideCta: false,
  checked: false,
};

export default PlanCard;
