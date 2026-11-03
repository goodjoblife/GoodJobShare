import { act, render } from '@testing-library/react';
import React, { useContext } from 'react';

import Facebook from 'common/facebook/Facebook';
import FacebookContext from 'contexts/FacebookContext';
import rollbar from 'utils/rollbar';

import FacebookContextProvider from './FacebookContextProvider';

jest.mock('common/facebook/Facebook');
jest.mock('utils/rollbar', () => ({ error: jest.fn() }));

const FacebookStatus = () => {
  const { status, loadFacebook, retryFacebook } = useContext(FacebookContext);
  return (
    <div>
      <div data-testid="facebook-status">{status}</div>
      <button
        data-testid="background-load"
        onClick={() => loadFacebook({ trigger: 'widget' })}
      />
      <button
        data-testid="user-load"
        onClick={() =>
          loadFacebook({ reportError: true, trigger: 'facebook-login' })
        }
      />
      <button
        data-testid="user-retry"
        onClick={() =>
          retryFacebook({ reportError: true, trigger: 'facebook-login' })
        }
      />
    </div>
  );
};

describe('FacebookContextProvider', () => {
  let resolveFacebook;
  let rejectFacebook;
  let initPromise;
  let init;
  let reset;

  const createInitPromise = () => {
    initPromise = new Promise((resolve, reject) => {
      resolveFacebook = resolve;
      rejectFacebook = reject;
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    createInitPromise();
    init = jest.fn(() => initPromise);
    reset = jest.fn(() => undefined);
    Facebook.mockImplementation(() => ({ init, reset }));
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('does not load the Facebook SDK when the provider mounts', () => {
    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    expect(getByTestId('facebook-status').textContent).toBe('idle');
    expect(init).not.toHaveBeenCalled();
    expect(rollbar.error).not.toHaveBeenCalled();
  });

  it('makes the Facebook SDK available without reporting an error when it loads in time', async () => {
    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );
    const facebookSdk = { login: jest.fn() };

    act(() => {
      getByTestId('background-load').click();
    });
    expect(getByTestId('facebook-status').textContent).toBe('loading');

    await act(async () => {
      resolveFacebook(facebookSdk);
      await initPromise;
    });

    expect(getByTestId('facebook-status').textContent).toBe('ready');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).not.toHaveBeenCalled();
  });

  it('makes a late Facebook SDK available without reporting a background timeout', async () => {
    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    act(() => {
      getByTestId('background-load').click();
    });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).not.toHaveBeenCalled();
    expect(getByTestId('facebook-status').textContent).toBe('timedOut');

    await act(async () => {
      resolveFacebook({ login: jest.fn() });
      await initPromise;
    });

    expect(getByTestId('facebook-status').textContent).toBe('ready');
    expect(rollbar.error).not.toHaveBeenCalled();
  });

  it('reports a timeout after the user explicitly tries Facebook login', () => {
    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    act(() => {
      getByTestId('user-load').click();
      jest.advanceTimersByTime(10000);
    });

    expect(getByTestId('facebook-status').textContent).toBe('timedOut');
    expect(rollbar.error).toHaveBeenCalledWith(
      '[ER0022] FB SDK load timed out',
      expect.objectContaining({
        reason: 'timeout',
        trigger: 'facebook-login',
      }),
    );
  });

  it('allows retry after a background SDK load failure', async () => {
    const loadError = new Error('Facebook SDK failed to load');

    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    act(() => {
      getByTestId('background-load').click();
    });

    await act(async () => {
      rejectFacebook(loadError);
      await initPromise.catch(() => undefined);
    });

    expect(getByTestId('facebook-status').textContent).toBe('failed');
    expect(rollbar.error).not.toHaveBeenCalled();

    createInitPromise();
    act(() => {
      getByTestId('user-retry').click();
    });

    expect(reset).toHaveBeenCalledTimes(1);
    expect(getByTestId('facebook-status').textContent).toBe('loading');

    await act(async () => {
      resolveFacebook({ login: jest.fn() });
      await initPromise;
    });

    expect(getByTestId('facebook-status').textContent).toBe('ready');
    expect(rollbar.error).not.toHaveBeenCalled();
  });
});
