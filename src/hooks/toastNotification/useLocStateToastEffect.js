import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isNil } from 'ramda';

import useToast from 'hooks/toastNotification/useToast';

const useLocStateToastEffect = () => {
  const location = useLocation();
  const toast = useToast();

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

    toast(type, content);
  }, [location, toast]);
};

export default useLocStateToastEffect;
