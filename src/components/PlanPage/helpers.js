import { compose, length, min, groupBy, prop } from 'ramda';
import { subscriptionType } from 'constants/subscription';

const MAX_COLUMN = 3;

export const getColumns = compose(
  min(MAX_COLUMN),
  length,
);

export const getActionTitle = type => {
  if (type === subscriptionType.submitData) {
    return '留下資料';
  }

  return '付費解鎖';
};

export const groupByPlanType = groupBy(prop('type'));
