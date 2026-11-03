import { render } from '@testing-library/react';
import React from 'react';

import FacebookContext, { FacebookStatus } from 'contexts/FacebookContext';
import LoginModalContext from 'contexts/LoginModalContext';

import LoginModal from './index';

jest.mock('common/Login/FacebookLoginButton', () => () => null);
jest.mock('common/Login/GoogleLoginButton', () => () => null);
jest.mock('hooks/auth', () => ({ useIsLoggedIn: () => false }));

const renderLoginModal = ({ inline = false, isOpen = false } = {}) => {
  const loadFacebook = jest.fn(() => Promise.resolve(null));

  render(
    <LoginModalContext.Provider
      value={{
        isLoginModalDisplayed: isOpen,
        setLoginModalDisplayed: jest.fn(),
      }}
    >
      <FacebookContext.Provider
        value={{
          FB: null,
          status: FacebookStatus.IDLE,
          loadFacebook,
          retryFacebook: jest.fn(),
        }}
      >
        <LoginModal inline={inline} />
      </FacebookContext.Provider>
    </LoginModalContext.Provider>,
  );

  return loadFacebook;
};

describe('LoginModal', () => {
  it('preloads Facebook for an inline login form', () => {
    const loadFacebook = renderLoginModal({ inline: true });

    expect(loadFacebook).toHaveBeenCalledWith({ trigger: 'login-modal' });
  });

  it('does not preload Facebook for a closed overlay modal', () => {
    const loadFacebook = renderLoginModal();

    expect(loadFacebook).not.toHaveBeenCalled();
  });

  it('preloads Facebook when the overlay modal opens', () => {
    const loadFacebook = renderLoginModal({ isOpen: true });

    expect(loadFacebook).toHaveBeenCalledWith({ trigger: 'login-modal' });
  });
});
