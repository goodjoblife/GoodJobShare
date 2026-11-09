import { act, render } from '@testing-library/react';
import React from 'react';

import FacebookContext from 'contexts/FacebookContext';
import LoginModalContext from 'contexts/LoginModalContext';
import rollbar from 'utils/rollbar';

import LoginModal from './index';

jest.mock('common/Login/FacebookLoginButton', () => () => null);
jest.mock('common/Login/GoogleLoginButton', () => () => null);
jest.mock('hooks/auth', () => ({ useIsLoggedIn: () => false }));
jest.mock('utils/rollbar', () => ({ error: jest.fn() }));

const renderLoginModal = ({
  FB = null,
  inline = false,
  isOpen = false,
} = {}) => {
  const setLoginModalDisplayed = jest.fn();

  const tree = facebookSdk => (
    <LoginModalContext.Provider
      value={{ isLoginModalDisplayed: isOpen, setLoginModalDisplayed }}
    >
      <FacebookContext.Provider value={facebookSdk}>
        <LoginModal inline={inline} />
      </FacebookContext.Provider>
    </LoginModalContext.Provider>
  );
  const result = render(tree(FB));

  return {
    ...result,
    rerenderWithFacebook: facebookSdk => result.rerender(tree(facebookSdk)),
  };
};

describe('LoginModal Facebook SDK availability reporting', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('does not report while the overlay modal is closed', () => {
    renderLoginModal();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).not.toHaveBeenCalled();
  });

  it('reports when the SDK stays unavailable in an open login modal', () => {
    renderLoginModal({ isOpen: true });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).toHaveBeenCalledWith(
      '[ER0022] FB SDK load timed out',
      expect.objectContaining({ trigger: 'login-modal' }),
    );
  });

  it('reports when the SDK stays unavailable in an inline login form', () => {
    renderLoginModal({ inline: true });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).toHaveBeenCalledWith(
      '[ER0022] FB SDK load timed out',
      expect.objectContaining({ trigger: 'inline-login' }),
    );
  });

  it('cancels the report when the SDK becomes available in time', () => {
    const { rerenderWithFacebook } = renderLoginModal({ isOpen: true });

    act(() => {
      jest.advanceTimersByTime(9000);
      rerenderWithFacebook({ login: jest.fn() });
      jest.advanceTimersByTime(1000);
    });

    expect(rollbar.error).not.toHaveBeenCalled();
  });
});
