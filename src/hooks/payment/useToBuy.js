import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { navigateToBuy } from '../../actions/payment';

const useToBuy = (redirectUrl = '/', skuId = null) => {
  const actionUrl = `/buy?skuId=${skuId}`;
  const dispatch = useDispatch();

  const toBuy = useCallback(() => {
    dispatch(navigateToBuy(redirectUrl, actionUrl));
  }, [dispatch, redirectUrl, actionUrl]);

  return { toBuy, actionUrl };
};

export default useToBuy;
