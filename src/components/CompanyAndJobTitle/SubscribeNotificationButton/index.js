import React from 'react';
import BellWhiteImage from 'common/icons/bellWhite.svg';
import BellBlackImage from 'common/icons/bellBlack.svg';
import PropTypes from 'prop-types';
import styles from './SubscribeNotificationButton.module.css';
import cn from 'classnames';

const SubscribeNotificationButton = ({ hasSubscribed = false } = {}) => {
  return (
    <button
      className={cn(styles.buttonContainer, {
        [styles.subscribed]: hasSubscribed,
      })}
      onClick={() => {
        // 我要
        // mutation {
        //    subscribeCompany(input: { companyId: "67f7970144d947cb9d6a517b" }) {
        //     success
        //   }
        // }
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
  hasSubscribed: PropTypes.bool,
};

export default SubscribeNotificationButton;
