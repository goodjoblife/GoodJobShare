import { act, render } from '@testing-library/react';
import React from 'react';

import FacebookContext, { FacebookStatus } from 'contexts/FacebookContext';

import FacebookWrapper from './FacebookWrapper';

describe('FacebookWrapper', () => {
  let intersectionCallback;
  let observer;
  let loadFacebook;

  beforeEach(() => {
    loadFacebook = jest.fn(() => Promise.resolve(null));
    observer = {
      disconnect: jest.fn(),
      observe: jest.fn(),
    };
    window.IntersectionObserver = jest.fn(callback => {
      intersectionCallback = callback;
      return observer;
    });
  });

  afterEach(() => {
    delete window.IntersectionObserver;
    jest.clearAllMocks();
  });

  it('loads the SDK only after the widget approaches the viewport', () => {
    render(
      <FacebookContext.Provider
        value={{
          FB: null,
          status: FacebookStatus.IDLE,
          loadFacebook,
          retryFacebook: jest.fn(),
        }}
      >
        <FacebookWrapper>
          <div>Facebook widget</div>
        </FacebookWrapper>
      </FacebookContext.Provider>,
    );

    expect(observer.observe).toHaveBeenCalledTimes(1);
    expect(loadFacebook).not.toHaveBeenCalled();

    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    expect(loadFacebook).toHaveBeenCalledWith({
      trigger: 'facebook-widget',
    });
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it('parses the widget after the SDK becomes ready', () => {
    const parse = jest.fn();

    render(
      <FacebookContext.Provider
        value={{
          FB: { XFBML: { parse } },
          status: FacebookStatus.READY,
          loadFacebook,
          retryFacebook: jest.fn(),
        }}
      >
        <FacebookWrapper>
          <div>Facebook widget</div>
        </FacebookWrapper>
      </FacebookContext.Provider>,
    );

    expect(parse).toHaveBeenCalledTimes(1);
    expect(parse.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
  });
});
