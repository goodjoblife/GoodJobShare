import * as ERROR_CODE from './errorCode';

const LOGIN_ERROR_MSG =
  '登入時發生錯誤，請再重試一次。若錯誤持續發生，請聯繫 findyourgoodjob@gmail.com';

const LOGIN_ERROR_MSG_CLEAN_BROWSER_DATA =
  '登入時發生錯誤，請清除瀏覽器資料，再重試一次。若錯誤持續發生，請聯繫 findyourgoodjob@gmail.com';

// maintain a list of global error code
export const ERROR_CODE_MSG = {
  [ERROR_CODE.ER0001]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB SDK is not ready',
  },
  [ERROR_CODE.ER0002]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB SDK login failed',
  },
  [ERROR_CODE.ER0003]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB login response is empty or does not have status field',
  },
  [ERROR_CODE.ER0004]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB login failed: unauthorized',
  },
  [ERROR_CODE.ER0005]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Graphql mutation facebookLogin failed',
  },
  [ERROR_CODE.ER0006]: {
    external: LOGIN_ERROR_MSG_CLEAN_BROWSER_DATA,
    internal: 'FB login failed: unknown auth status',
  },
  [ERROR_CODE.ER0007]: {
    internal: 'Submit salary failed',
  },
  [ERROR_CODE.ER0008]: {
    internal: 'Submit interview failed',
  },
  [ERROR_CODE.ER0009]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Cannot get id_token from Google auth API',
  },
  [ERROR_CODE.ER0010]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Cannot get token from Graphql googleLogin mutation response',
  },
  [ERROR_CODE.ER0011]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql googleLogin mutation API failed with codes=UNAUTHENTICATED',
  },
  [ERROR_CODE.ER0012]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql googleLogin mutation API failed with codes=FORBIDDEN, probably this user is deactivated',
  },
  [ERROR_CODE.ER0013]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Unknown error during Graphql googleLogin mutation',
  },
  [ERROR_CODE.ER0014]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql facebookLogin mutation API failed with codes=UNAUTHENTICATED',
  },
  [ERROR_CODE.ER0015]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql facebookLogin mutation API failed with codes=FORBIDDEN, probably this user is deactivated',
  },
  [ERROR_CODE.ER0016]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Unknown error during Graphql facebookLogin mutation',
  },
  [ERROR_CODE.ER0018]: {
    internal: 'Unexpected error during submitting form data',
  },
  [ERROR_CODE.ER0019]: {
    internal: 'Not submittable',
  },
  [ERROR_CODE.ER0020]: {
    internal: 'Submit work experience failed',
  },
  [ERROR_CODE.ER0021]: {
    internal: 'Warning without validation failure',
  },
};
