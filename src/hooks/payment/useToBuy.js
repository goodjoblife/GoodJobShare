import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { navigateToBuy } from '../../actions/payment';

const useToBuy = (redirectUrl = '/', skuId = null) => {
  const dispatch = useDispatch();

  const toBuy = useCallback(() => {
    dispatch(navigateToBuy(redirectUrl, skuId));
  }, [dispatch, redirectUrl, skuId]);

  return toBuy;
};

export default useToBuy;
