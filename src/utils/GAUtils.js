/**
 * 從 GA SDK 取得 User Pseudo ID，又稱 Client ID
 * 是使用者在該 GA 資源、該 device 上的 user id
 * Ref:
 *  1. https://support.google.com/analytics/answer/12675187?hl=en
 *  2. https://developers.google.com/tag-platform/gtagjs/reference#get
 * @param {*} ga_measurement_id
 * @returns
 */
export const getUserPseudoId = ga_measurement_id => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('get', ga_measurement_id, 'client_id', resolve);
        /* 
          In Brave browser, window.gtag execution will be terminated without 
          throwing error, so this promise will not never being resolved or rejected.
          To avoid this, we use setTimeout to reject the promise after 1s
        */
        setTimeout(() => {
          console.error('Unable to resolve GA User Pseudo Id');
          resolve(null);
        }, 500);
      } else {
        resolve(null);
      }
    } catch (e) {
      console.error(e);
      reject(null);
    }
  });
};
