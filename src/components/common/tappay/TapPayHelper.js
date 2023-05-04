import {
  TAP_PAY_APP_ID,
  TAP_PAY_APP_KEY,
  TAP_PAY_SERVER_TYPE,
} from '../../../config';

class TapPayHelper {
  loadingPromise = null;

  static init() {
    console.log('TapPay init', TapPayHelper.loadingPromise);
    if (TapPayHelper.loadingPromise) {
      return TapPayHelper.loadingPromise;
    }
    console.log('TapPay init');

    TapPayHelper.loadingPromise = new Promise(resolve => {
      const fjs = document.getElementsByTagName('script')[0];
      const js = document.createElement('script');
      js.id = 'tappay';
      js.src = 'https://js.tappaysdk.com/tpdirect/v5.12.3';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = () => {
        window.TPDirect.setupSDK(
          TAP_PAY_APP_ID,
          TAP_PAY_APP_KEY,
          TAP_PAY_SERVER_TYPE,
        );
        resolve(window.TPDirect);
      };
    });

    return TapPayHelper.loadingPromise;
  }
}

export default TapPayHelper;
