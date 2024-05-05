import React from 'react';
import Checked from 'common/icons/Checked';
import Close from 'common/icons/Close';
import Exclamation from 'common/icons/Exclamation';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import styles from './NotificationIcon.module.css';
import { getIconColor } from './helpers';

const NotificationIcon = ({ type }) => {
  const iconColor = getIconColor(type);

  if (type === NOTIFICATION_TYPE.INFO) {
    return <Checked className={styles.icon} style={{ fill: iconColor }} />;
  } else if (type === NOTIFICATION_TYPE.WARNING) {
    return <Exclamation className={styles.icon} style={{ fill: iconColor }} />;
  } else {
    return <Close className={styles.icon} style={{ fill: iconColor }} />;
  }
};

export default NotificationIcon;
