import Facebook from './Facebook';

describe('Facebook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = '<script id="existing-script"></script>';
    delete window.FB;
    delete window.fbAsyncInit;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
    delete window.FB;
    delete window.fbAsyncInit;
  });

  it('resolves when the SDK loads after ten seconds', async () => {
    const facebook = new Facebook('app-id');
    const initPromise = facebook.init();
    const FB = { init: jest.fn() };

    jest.advanceTimersByTime(10000);
    window.FB = FB;
    window.fbAsyncInit();

    await expect(initPromise).resolves.toBe(FB);
    expect(FB.init).toHaveBeenCalledWith({
      appId: 'app-id',
      cookie: true,
      xfbml: true,
      version: 'v19.0',
    });
  });

  it('removes a failed script so init can retry', async () => {
    const facebook = new Facebook('app-id');
    const firstInitPromise = facebook.init();
    const failedScript = document.getElementById('facebook-jssdk');

    failedScript.onerror();

    await expect(firstInitPromise).rejects.toThrow(
      'Facebook SDK failed to load',
    );
    expect(document.getElementById('facebook-jssdk')).toBeNull();

    const secondInitPromise = facebook.init();
    expect(document.getElementById('facebook-jssdk')).not.toBeNull();

    const FB = { init: jest.fn() };
    window.FB = FB;
    window.fbAsyncInit();

    await expect(secondInitPromise).resolves.toBe(FB);
  });
});
