import React from 'react';

import useNotificationData from 'hooks/toastNotification/useNotificationData';
import styles from './toastNotification.module.css';

const Notification = ({ type, content }) => {
  return <div>{`${type} - ${content}`}</div>;
};

const ToastNotification = () => {
  const notifications = useNotificationData();
  return (
    <div className={styles.container}>
      {notifications.map(({ id, content, type }) => (
        <Notification key={id} content={content} type={type} />
      ))}
    </div>
  );
};

export default ToastNotification;
