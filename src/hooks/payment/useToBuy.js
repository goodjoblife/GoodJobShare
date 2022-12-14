import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setRedirectUrl } from '../../actions/payment';

const useToBuy = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const redirectUrl = history.location.pathname;

  const toBuy = useCallback(() => {
    dispatch(setRedirectUrl(redirectUrl));
  }, [dispatch, redirectUrl]);

  return toBuy;
};

export default useToBuy;
