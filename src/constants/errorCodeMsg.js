const LOGIN_ERROR_MSG =
  '登入時發生錯誤，請再重試一次。若錯誤持續發生，請聯繫 findyourgoodjob@gmail.com';

const LOGIN_ERROR_MSG_CLEAN_BROWSER_DATA =
  '登入時發生錯誤，請清除瀏覽器資料，再重試一次。若錯誤持續發生，請聯繫 findyourgoodjob@gmail.com';

// maintain a list of global error code
export const ERROR_CODE_MSG = {
  ER0001: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB SDK is not ready',
  },
  ER0002: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB SDK login failed',
  },
  ER0003: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB login response is empty or does not have status field',
  },
  ER0004: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB login failed: unauthorized',
  },
  ER0005: {
    external: LOGIN_ERROR_MSG,
    internal: 'Graphql mutation facebookLogin failed',
  },
  ER0006: {
    external: LOGIN_ERROR_MSG_CLEAN_BROWSER_DATA,
    internal: 'FB login failed: unknown auth status',
  },
  ER0007: {
    internal: 'Submit salary failed',
  },
  ER0008: {
    internal: 'Submit interview failed',
  },
};
