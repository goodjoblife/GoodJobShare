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

  it('makes a late Facebook SDK available after reporting a timeout', async () => {
    const { getByTestId } = render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).toHaveBeenCalledTimes(1);
    expect(getByTestId('facebook-status').textContent).toBe('loading');

    await act(async () => {
      resolveFacebook({ login: jest.fn() });
      await initPromise;
    });

    expect(getByTestId('facebook-status').textContent).toBe('ready');
    expect(rollbar.error).toHaveBeenCalledTimes(1);
  });

  it('reports an SDK load failure without waiting for the timeout', async () => {
    render(
      <FacebookContextProvider>
        <FacebookStatus />
      </FacebookContextProvider>,
    );

    await act(async () => {
      rejectFacebook(new Error('Facebook SDK failed to load'));
      await expect(initPromise).rejects.toThrow('Facebook SDK failed to load');
    });

    expect(rollbar.error).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(rollbar.error).toHaveBeenCalledTimes(1);
  });
});
