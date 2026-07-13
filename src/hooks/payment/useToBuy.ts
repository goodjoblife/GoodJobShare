import { isNil } from 'ramda';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { navigateToBuy } from 'actions/payment';

const useToBuy = (
  redirectUrl = '/',
  skuId: string | null = null,
): { toBuy: () => void; actionUrl: string } => {
  const actionUrl = isNil(skuId) ? '/buy' : `/buy?skuId=${skuId}`;
  const dispatch = useDispatch();

  const toBuy = useCallback(() => {
    dispatch(navigateToBuy(redirectUrl, actionUrl));
  }, [dispatch, redirectUrl, actionUrl]);

  return { toBuy, actionUrl };
};

export default useToBuy;
