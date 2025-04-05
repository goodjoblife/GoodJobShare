import React from 'react';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import BellBlackImage from 'common/icons/bellBlack.svg';
import PropTypes from 'prop-types';
import styles from './NotificationBell.module.css';
import cn from 'classnames';

const SubscribeNotification = ({ hasSubscribed = false } = {}) => {
  return (
    <div
      className={cn(styles.subscribeNotificationContainer, {
        [styles.subscribed]: hasSubscribed,
      })}
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
    </div>
  );
};

SubscribeNotification.propTypes = {
  hasSubscribed: PropTypes.bool,
};

export default SubscribeNotification;
