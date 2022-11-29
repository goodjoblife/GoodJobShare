import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setFromUrl } from '../../actions/payment';

const useToBuy = () => {
  const fromUrl = '';

  const dispatch = useDispatch();

  const toBuy = useCallback(() => {
    dispatch(setFromUrl(fromUrl));
  }, [dispatch, fromUrl]);

  return toBuy;
};

export default useToBuy;
