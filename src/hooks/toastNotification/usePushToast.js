import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { pushNotification } from 'actions/toastNotification';

const usePushToast = () => {
  const dispatch = useDispatch();

  const pushToast = useCallback(
    (type, content) => {
      dispatch(pushNotification(type, content));
    },
    [dispatch],
  );

  return pushToast;
};

export default usePushToast;
