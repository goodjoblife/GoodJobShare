/*
 * FB SDK 包裝
 */
// reference: https://github.com/CherryProjects/react-facebook/blob/master/src/Facebook.js
// 由於需要 DOM，所以 Server Side Rendering 不能使用

export default class Facebook {
  constructor(appId) {
    this.appId = appId;
    this.loadingPromise = null;
    this.rejectLoading = null;
    this.asyncInit = null;
    this.loadId = 0;
  }

  init() {
    if (window.FB) {
      return Promise.resolve(window.FB);
    }

    // 第二次 init 時可以取用之前的結果
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    const loadId = ++this.loadId;
    const loadingPromise = new Promise((resolve, reject) => {
      const appId = this.appId;

      // FB SDK loading 後會觸發 window.fbAsyncInit
      this.rejectLoading = reject;
      this.asyncInit = () => {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: 'v19.0',
        });

        resolve(window.FB);
      };
      window.fbAsyncInit = this.asyncInit;

      // FB SDK
      // eslint-disable-next-line
      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/zh_TW/sdk.js';
        js.onerror = () => {
          if (js.parentNode) {
            js.parentNode.removeChild(js);
          }
          reject(new Error('Facebook SDK failed to load'));
        };
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    })
      .then(FB => {
        if (loadId === this.loadId) {
          this.rejectLoading = null;
        }
        return FB;
      })
      .catch(error => {
        if (loadId === this.loadId) {
          this.rejectLoading = null;
          this.loadingPromise = null;
        }
        throw error;
      });
    this.loadingPromise = loadingPromise;

    return this.loadingPromise;
  }

  reset() {
    this.loadId += 1;
    const script = document.getElementById('facebook-jssdk');
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }

    if (window.fbAsyncInit === this.asyncInit) {
      delete window.fbAsyncInit;
    }

    const rejectLoading = this.rejectLoading;
    this.rejectLoading = null;
    this.loadingPromise = null;
    this.asyncInit = null;

    if (rejectLoading) {
      rejectLoading(new Error('Facebook SDK load was reset'));
    }
  }
}
