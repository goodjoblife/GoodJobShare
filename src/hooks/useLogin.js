import React, { useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { statusSelector } from '../selectors/authSelector';
import AUTH_STATUS from '../constants/authStatus';
import LoginModal from 'common/LoginModal';

const isLoginSelector = state =>
  statusSelector(state) === AUTH_STATUS.CONNECTED;

const useLogin = () => {
  const hasLoggedIn = useSelector(isLoginSelector);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const login = useCallback(() => setLoginModalOpen(true), []);
  const cancel = useCallback(() => setLoginModalOpen(false), []);
  const loginModal = useMemo(
    () => <LoginModal isOpen={isLoginModalOpen} close={cancel} />,
    [cancel, isLoginModalOpen],
  );
  return [hasLoggedIn, loginModal, login, cancel];
};

export default useLogin;
