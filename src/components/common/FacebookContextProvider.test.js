import { act, render } from '@testing-library/react';
import React, { useContext } from 'react';

import Facebook from 'common/facebook/Facebook';
import FacebookContext from 'contexts/FacebookContext';
import rollbar from 'utils/rollbar';

import FacebookContextProvider from './FacebookContextProvider';

jest.mock('common/facebook/Facebook');
jest.mock('utils/rollbar', () => ({ error: jest.fn() }));

const FacebookStatus = () => {
  const FB = useContext(FacebookContext);
  return <div data-testid="facebook-status">{FB ? 'ready' : 'loading'}</div>;
};

describe('FacebookContextProvider', () => {
  let resolveFacebook;
  let rejectFacebook;
  let initPromise;

  beforeEach(() => {
    jest.useFakeTimers();
    initPromise = new Promise((resolve, reject) => {
      resolveFacebook = resolve;
      rejectFacebook = reject;
    });
    Facebook.mockImplementation(() => ({ init: () => initPromise }));
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('makes the Facebook SDK available without reporting an error when it loads in time', async () => {
    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );
    const facebookSdk = { login: jest.fn() };

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

  it('makes a late Facebook SDK available after reporting a timeout', async () => {
    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).toHaveBeenCalledWith(
      '[ER0022] FB SDK failed to load or timed out Facebook SDK load timed out',
      expect.objectContaining({ message: 'Facebook SDK load timed out' }),
    );
    expect(getByTestId('facebook-status').textContent).toBe('loading');

    await act(async () => {
      resolveFacebook({ login: jest.fn() });
      await initPromise;
    });

    expect(getByTestId('facebook-status').textContent).toBe('ready');
    expect(rollbar.error).toHaveBeenCalledTimes(1);
  });

  it('reports an SDK load failure without waiting for the timeout', async () => {
    const loadError = new Error('Facebook SDK failed to load');

    render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    await act(async () => {
      rejectFacebook(loadError);
      await expect(initPromise).rejects.toThrow('Facebook SDK failed to load');
    });

    expect(rollbar.error).toHaveBeenCalledWith(
      '[ER0022] FB SDK failed to load or timed out Facebook SDK failed to load',
      loadError,
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).toHaveBeenCalledTimes(1);
  });
});
