/*
 * FB SDK 包裝
 */
// reference: https://github.com/CherryProjects/react-facebook/blob/master/src/Facebook.js
// 由於需要 DOM，所以 Server Side Rendering 不能使用

export default class Facebook {
  constructor(appId) {
    this.appId = appId;
  }

  init() {
    // 第二次 init 時可以取用之前的結果
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise(resolve => {
      const appId = this.appId;

      // FB SDK loading 後會觸發 window.fbAsyncInit
      window.fbAsyncInit = () => {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: 'v19.0',
        });

        resolve(window.FB);
      };

      // FB SDK
      // eslint-disable-next-line
      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/zh_TW/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });

    return this.loadingPromise;
  }
}
