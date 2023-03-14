import React from 'react';

import useNotificationData from 'hooks/toastNotification/useNotificationData';
import useToast from 'hooks/toastNotification/useToast';

import Notification from './Notification';
import styles from './ToastNotification.module.css';

const ToastNotification = () => {
  const notifications = useNotificationData();
  const toast = useToast();
  return (
    <div className={styles.container}>
      <button
        style={{ position: 'fixed', top: '200px', left: '100px' }}
        onClick={() => toast('INFO', 'message from the user')}
      >
        ADD
      </button>
      {notifications.map(({ id, content, type }, index) => (
        <Notification key={id} index={index} content={content} type={type} />
      ))}
    </div>
  );
};

export default ToastNotification;
