import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { pushNotification } from '../../actions/toastNotification';

const useToast = () => {
  const dispatch = useDispatch();

  const toast = useCallback(
    (type, content) => {
      dispatch(pushNotification(type, content));
    },
    [dispatch],
  );

  return toast;
};

export default useToast;
