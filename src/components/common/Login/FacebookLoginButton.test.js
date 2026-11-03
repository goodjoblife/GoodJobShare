import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import FacebookContext, { FacebookStatus } from 'contexts/FacebookContext';
import { useFacebookLogin } from 'hooks/login';

import FacebookLoginButton from './FacebookLoginButton';

jest.mock('hooks/login', () => ({ useFacebookLogin: jest.fn() }));

const renderButton = (contextValue, props = {}) =>
  render(
    <FacebookContext.Provider value={contextValue}>
      <FacebookLoginButton {...props} />
    </FacebookContext.Provider>,
  );

describe('FacebookLoginButton', () => {
  let fbLogin;
  let loadFacebook;
  let retryFacebook;

  beforeEach(() => {
    fbLogin = jest.fn();
    loadFacebook = jest.fn(() => Promise.resolve(null));
    retryFacebook = jest.fn(() => Promise.resolve(null));
    useFacebookLogin.mockReturnValue(fbLogin);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs in immediately when the SDK is ready', () => {
    const { getByRole } = renderButton({
      FB: { login: jest.fn() },
      status: FacebookStatus.READY,
      loadFacebook,
      retryFacebook,
    });

    fireEvent.click(getByRole('button'));

    expect(fbLogin).toHaveBeenCalledTimes(1);
    expect(loadFacebook).not.toHaveBeenCalled();
  });

  it('stays disabled until the preloaded SDK is ready', () => {
    const { getByRole } = renderButton({
      FB: null,
      status: FacebookStatus.IDLE,
      loadFacebook,
      retryFacebook,
    });

    const button = getByRole('button');

    expect(button.disabled).toBe(true);
    fireEvent.click(button);

    expect(loadFacebook).not.toHaveBeenCalled();
    expect(retryFacebook).not.toHaveBeenCalled();
    expect(fbLogin).not.toHaveBeenCalled();
  });

  it('offers a retry after the SDK times out', () => {
    const { getByRole } = renderButton({
      FB: null,
      status: FacebookStatus.TIMED_OUT,
      loadFacebook,
      retryFacebook,
    });
    const button = getByRole('button');

    expect(button.textContent).toContain('重試 Facebook 登入');
    fireEvent.click(button);

    expect(retryFacebook).toHaveBeenCalledWith({
      reportError: true,
      trigger: 'facebook-login-retry',
    });
  });

  it('preloads the SDK when requested by its parent', () => {
    renderButton(
      {
        FB: null,
        status: FacebookStatus.IDLE,
        loadFacebook,
        retryFacebook,
      },
      { preload: true },
    );

    expect(loadFacebook).toHaveBeenCalledWith({
      trigger: 'facebook-login-button',
    });
  });
});
