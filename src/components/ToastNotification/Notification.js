import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import useRemoveNotification from 'hooks/toastNotification/useRemoveToast';
import useTimer, { countingStatusMap } from 'hooks/useTimer';
import CloseNoCircle from 'common/icons/CloseNoCircle';
import Checked from 'common/icons/Checked';
import Close from 'common/icons/Close';
import Exclamation from 'common/icons/Exclamation';
import { P } from 'common/base';

import { getOffsetY, statusMap, getIconColor } from './helpers';
import styles from './Notification.module.css';

const FADE_OUT_TIME = 5000;
const SUNSET_TIME_IN_SEC = 0.6;
const HEIGHT = 80;
const MARGIN_Y = 20;

const calOffsetY = getOffsetY(HEIGHT)(MARGIN_Y);

const Notification = ({ index, type, content, id }) => {
  const [status, setStatus] = useState(statusMap.ACTIVE);
  const removeNotification = useRemoveNotification();
  const toSunset = useCallback(() => {
    setStatus(statusMap.SUNSET);
  }, [setStatus]);

  useEffect(() => {
    if (status === statusMap.SUNSET) {
      const timer = setTimeout(() => {
        setStatus(statusMap.INACTIVE);
      }, SUNSET_TIME_IN_SEC * 1000);

      return () => clearTimeout(timer);
    }

    if (status === statusMap.INACTIVE) {
      removeNotification(id);
    }
  }, [status, removeNotification, id]);

  useTimer(toSunset, FADE_OUT_TIME, countingStatusMap.counting);

  const offsetY = `${calOffsetY(index)}px`;
  const opacity = status === statusMap.ACTIVE ? 100 : 0;

  const iconColor = getIconColor(type);

  const renderIcon = () => {
    if (type == NOTIFICATION_TYPE.INFO) {
      return <Checked className={styles.icon} style={{ fill: iconColor }} />;
    } else if (type == NOTIFICATION_TYPE.WARNING) {
      return (
        <Exclamation className={styles.icon} style={{ fill: iconColor }} />
      );
    } else {
      return <Close className={styles.icon} style={{ fill: iconColor }} />;
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateY(${offsetY})`,
        opacity,
        transition: `transform 0.6s ease-in, opacity ${SUNSET_TIME_IN_SEC}s ease-in`,
      }}
    >
      <div className={styles.left}>
        {renderIcon()}
        <P tag="p" className={styles.message} title={content}>{`${content}`}</P>
      </div>
      <div className={styles.right}>
        <button className={styles.close} type="button" onClick={toSunset}>
          <CloseNoCircle width="12px" height="12px" />
        </button>
      </div>
    </div>
  );
};

Notification.propTypes = {
  index: PropTypes.number,
  type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPE)),
  content: PropTypes.string,
  id: PropTypes.string,
};

export default Notification;
