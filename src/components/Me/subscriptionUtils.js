export const subscriptionStatus = {
  INIT: '待確認',
  OK: '成功',
  FAILED: '失敗',
  SUSPENDED: '停權',
};

export const isFailed = status => status === 'FAILED' || status === 'SUSPENDED';
