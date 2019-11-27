/**
 * trigger event to Google Tag Manager via `window.dataLayer`
 *
 * @param {Object} event - GTM event to be push into dataLayer
 * @see {@link https://developers.google.com/tag-manager/devguide}
 */
export const pushDataLayer = event => {
  if (window.dataLayer) {
    window.dataLayer.push(event);
  } else {
    window.dataLayer = [event];
  }
};

/**
 * Google Optimize 會在 Page Load 檢查是否執行 A/B testing，但因為 SPA 只會發生一
 * 次 Page Load，所以需要額外送 optimize.active 之類的 event，才能讓 Optimize 知道
 * 頁面切換。
 *
 * 目前在 Root.js 裡面的 componentDidMount & componentDidUpdate 都會 push
 * `optimize.activate` 事件到 dataLayer，就可以讓 SPA 的 react 可以在每個頁面都能
 * 觸發 google optimize 的實驗
 *
 * @param {string=} customOptimizeEventName - 供 Google Optimize 辨識的 event 名稱，預設為 'optimize.activate'
 * @see {@link https://support.google.com/optimize/answer/7008840?hl=en}
 * @see {@link https://developers.google.com/tag-manager/devguide}
 */
export const activateOptimize = customOptimizeEventName => {
  pushDataLayer({ event: `optimize.${customOptimizeEventName || 'activate'}` });
};
