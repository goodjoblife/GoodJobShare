import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RoundCard from 'common/RoundCard';
import Button from 'common/button/Button';
import Heading from 'common/base/Heading';
import P from 'common/base/P';
import { subscriptionType } from 'constants/subscription';

import styles from './PlanCard.module.css';
import { getActionTitle } from './helpers';

const getButtonType = type => {
  if (type === subscriptionType.submitData) {
    return 'yellow';
  }
  return 'hollowRed';
};

const PlanCard = ({ title, description, amount, actionUrl, type }) => {
  const actionTitle = getActionTitle(type);

  const isSubmitData = type === subscriptionType.submitData;
  return (
    <RoundCard className={styles.container}>
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
        <div className={styles.bottomArea}>
          {isSubmitData && (
            <div>
              <P className={styles.helperText} size="s">
                \ 留下你的資料幫助其他人 /
              </P>
            </div>
          )}
          <Link to={actionUrl}>
            <Button
              className={styles.actionButton}
              btnStyle={getButtonType(type)}
            >
              {actionTitle}
            </Button>
          </Link>
        </div>
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
};

PlanCard.defaultProps = {
  title: '',
  description: '',
  actionUrl: '',
  amount: 0,
};

export default PlanCard;
