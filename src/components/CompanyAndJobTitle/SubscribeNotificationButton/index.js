import React from 'react';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import BellBlackImage from 'common/icons/bellBlack.svg';
import PropTypes from 'prop-types';
import styles from './SubscribeNotificationButton.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { createCompanySubscription } from 'actions/company';

const SubscribeNotificationButton = ({ hasSubscribed = false, companyId }) => {
  const dispatch = useDispatch();

  console.log('companyId', companyId);

  return (
    <button
      className={cn(styles.buttonContainer, {
        [styles.subscribed]: hasSubscribed,
      })}
      onClick={() => {
        dispatch(createCompanySubscription({ companyId }));
      }}
    >
      <div className={styles.bellContainer}>
        <img
          src={BellWhiteImage}
          className={styles.bellWhite}
          alt="notificationWhiteBell"
        />
        <img
          src={BellBlackImage}
          className={styles.bellBlack}
          alt="notificationBlackBell"
        />
      </div>
      <div>{hasSubscribed ? '已訂閱新資料通知' : '有新資料時通知我'}</div>
    </button>
  );
};

SubscribeNotificationButton.propTypes = {
  companyId: PropTypes.string.isRequired,
  hasSubscribed: PropTypes.bool,
};

export default SubscribeNotificationButton;
