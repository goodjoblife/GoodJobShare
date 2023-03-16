import React from 'react';

import useNotificationData from 'hooks/toastNotification/useNotificationData';

import Notification from './Notification';
import styles from './ToastNotification.module.css';

const ToastNotification = () => {
  const notifications = useNotificationData();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {notifications.map(({ id, content, type }, index) => (
          <Notification
            key={id}
            index={index}
            content={content}
            type={type}
            id={id}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastNotification;
