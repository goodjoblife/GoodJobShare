import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { isNil } from 'ramda';

import { navigateToBuy } from 'actions/payment';

const useToBuy = (redirectUrl = '/', skuId = null) => {
  const actionUrl = isNil(skuId) ? '/buy' : `/buy?skuId=${skuId}`;
  const dispatch = useDispatch();

  const toBuy = useCallback(() => {
    dispatch(navigateToBuy(redirectUrl, actionUrl));
  }, [dispatch, redirectUrl, actionUrl]);

  return { toBuy, actionUrl };
};

export default useToBuy;
