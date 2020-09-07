import React, { useMemo, useCallback, useState } from 'react';
import { useIsLogin } from 'hooks/auth';
import LoginModal from 'common/LoginModal';

const useLogin = () => {
  const hasLoggedIn = useIsLogin();
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
