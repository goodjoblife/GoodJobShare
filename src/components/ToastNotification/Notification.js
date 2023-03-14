import React from 'react';
import PropTypes from 'prop-types';

import { NOTIFICATION_TYPE } from 'constants/toastNotification';

import { getOffsetY } from './helpers';
import styles from './Notification.module.css';

const HEIGHT = 100;
const MARGIN_Y = 20;

const calOffsetY = getOffsetY(HEIGHT)(MARGIN_Y);

const Notification = ({ index, type, content }) => {
  const offsetY = `${calOffsetY(index)}px`;

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateY(${offsetY})`,
      }}
    >{`${type} - ${content}`}</div>
  );
};

Notification.propTypes = {
  index: PropTypes.number,
  type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPE)),
  content: PropTypes.string,
};

export default Notification;
