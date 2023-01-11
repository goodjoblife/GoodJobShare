const getPlans = () =>
  Promise.resolve([
    {
      skuId: 'submit-data',
      type: 'SubmitData',
      title: '留下一筆資料',
      description: '解鎖全站 7 天',
      amount: 0,
    },
    {
      skuId: '1-months-subscription',
      type: 'BuySubscription',
      title: '包月方案',
      description: '解鎖全站 1 個月',
      amount: 99,
    },
    {
      skuId: '3-months-subscription',
      type: 'BuySubscription',
      title: '包季方案',
      description: '解鎖全站 3 個月',
      amount: 149,
    },
  ]);

export default {
  getPlans,
};
