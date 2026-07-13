import { compose, length, min } from 'ramda';

import { SubscriptionPlanType } from 'constants/subscription';

const MAX_COLUMN = 3;

export const getColumns = compose(
  min(MAX_COLUMN),
  length,
);

export const getActionTitle = type => {
  if (type === SubscriptionPlanType.SUBMIT_DATA) {
    return '留下資料';
  }

  return '付費解鎖';
};
