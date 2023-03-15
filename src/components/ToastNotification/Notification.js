import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import useRemoveNotification from 'hooks/toastNotification/useRemoveToast';
import Close from 'common/icons/Close';

import { getOffsetY } from './helpers';
import styles from './Notification.module.css';

const HEIGHT = 100;
const MARGIN_Y = 20;

const calOffsetY = getOffsetY(HEIGHT)(MARGIN_Y);

const Notification = ({ index, type, content, id }) => {
  const removeNotification = useRemoveNotification();
  const remove = useCallback(() => {
    removeNotification(id);
  }, [id, removeNotification]);

  const offsetY = `${calOffsetY(index)}px`;

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateY(${offsetY})`,
        transition: 'transform 0.6s ease-in',
      }}
    >
      <div>
        <button onClick={remove}>
          <Close />
        </button>
      </div>
      {`${id}: ${type} - ${content}`}
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
