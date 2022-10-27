import { compose, length, min } from 'ramda';

const MAX_COLUMN = 3;

export const getColumns = compose(
  min(MAX_COLUMN),
  v => {
    console.log('v', v);
    return v;
  },
  length,
);

export const getActionTitle = plan => {
  if (plan.type === 'SubmitData') {
    return '留下資料';
  }

  return '付費解鎖';
};
