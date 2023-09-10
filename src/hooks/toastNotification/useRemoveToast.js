import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { removeNotification } from '../../actions/toastNotification';

const useRemoveToast = () => {
  const dispatch = useDispatch();

  const toast = useCallback(
    id => {
      dispatch(removeNotification(id));
    },
    [dispatch],
  );

  return toast;
};

export default useRemoveToast;
