import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { navigateToRedirectUrl } from '../../actions/payment';

const useToRedirectUrl = () => {
  const dispatch = useDispatch();

  const toRedirectUrl = useCallback(() => {
    dispatch(navigateToRedirectUrl());
  }, [dispatch]);

  return toRedirectUrl;
};

export default useToRedirectUrl;
