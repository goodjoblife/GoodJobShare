import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isNil } from 'ramda';

import usePushToast from 'hooks/toastNotification/usePushToast';

const useLocStateToastEffect = () => {
  const location = useLocation();
  const pushToast = usePushToast();

  useEffect(() => {
    const state = location.state || {};

    const { toastNotification } = state;

    if (isNil(toastNotification)) {
      return;
    }

    const { type, content } = toastNotification;

    if (isNil(type) || isNil(content)) {
      return;
    }

    pushToast(type, content);
  }, [location, pushToast]);
};

export default useLocStateToastEffect;
