import R from 'ramda';

const stateToApiParams = state => ({
  reason_category: state.reasonCategory,
  reason: state.reason,
});

const omitByReasonCategory = state => {
  if (state.reasonCategory === '這是廣告或垃圾訊息') {
    return R.omit(['reason'], state);
  }
  return state;
};

export const handleToApiParams = R.compose(
  stateToApiParams,
  omitByReasonCategory
);

export const foo = 1;
