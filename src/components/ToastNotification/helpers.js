import { NOTIFICATION_TYPE } from 'constants/toastNotification';

export const getOffsetY = eleHeight => marginY => index => {
  return index * (eleHeight + marginY);
};

export const statusMap = {
  ACTIVE: 'ACTIVE',
  SUNSET: 'SUNSET',
  INACTIVE: 'INACTIVE',
};

export const getIconColor = type => {
  if (type === NOTIFICATION_TYPE.ALERT) {
    return '#d50000';
  }

  if (type === NOTIFICATION_TYPE.WARNING) {
    return '#E5BA00';
  }

  return '#84b558';
};
