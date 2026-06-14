import PropTypes from 'prop-types';
import React from 'react';

import Checked from 'common/icons/Checked';
import Close from 'common/icons/Close';
import Exclamation from 'common/icons/Exclamation';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';

import { getIconColor } from './helpers';
import styles from './NotificationIcon.module.css';

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

NotificationIcon.propTypes = {
  type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPE)).isRequired,
};

export default NotificationIcon;
