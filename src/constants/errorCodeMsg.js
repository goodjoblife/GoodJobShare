const LOGIN_ERROR_MSG =
  '登入時發生錯誤，請再重試一次。若錯誤持續發生，請聯繫 findyourgoodjob@gmail.com';

const LOGIN_ERROR_MSG_CLEAN_BROWSER_DATA =
  '登入時發生錯誤，請清除瀏覽器資料，再重試一次。若錯誤持續發生，請聯繫 findyourgoodjob@gmail.com';

export const ER0001 = 'ER0001';
export const ER0002 = 'ER0002';
export const ER0003 = 'ER0003';
export const ER0004 = 'ER0004';
export const ER0005 = 'ER0005';
export const ER0006 = 'ER0006';
export const ER0007 = 'ER0007';
export const ER0008 = 'ER0008';
export const ER0009 = 'ER0009';
export const ER0010 = 'ER0010';
export const ER0011 = 'ER0011';
export const ER0012 = 'ER0012';
export const ER0013 = 'ER0013';
export const ER0014 = 'ER0014';
export const ER0015 = 'ER0015';
export const ER0016 = 'ER0016';
export const ER0018 = 'ER0018';
export const ER0019 = 'ER0019';
export const ER0020 = 'ER0020';
export const ER0021 = 'ER0021';

// maintain a list of global error code
export const ERROR_CODE_MSG = {
  [ER0001]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB SDK is not ready',
  },
  [ER0002]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB SDK login failed',
  },
  [ER0003]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB login response is empty or does not have status field',
  },
  [ER0004]: {
    external: LOGIN_ERROR_MSG,
    internal: 'FB login failed: unauthorized',
  },
  [ER0005]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Graphql mutation facebookLogin failed',
  },
  [ER0006]: {
    external: LOGIN_ERROR_MSG_CLEAN_BROWSER_DATA,
    internal: 'FB login failed: unknown auth status',
  },
  [ER0007]: {
    internal: 'Submit salary failed',
  },
  [ER0008]: {
    internal: 'Submit interview failed',
  },
  [ER0009]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Cannot get id_token from Google auth API',
  },
  [ER0010]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Cannot get token from Graphql googleLogin mutation response',
  },
  [ER0011]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql googleLogin mutation API failed with codes=UNAUTHENTICATED',
  },
  [ER0012]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql googleLogin mutation API failed with codes=FORBIDDEN, probably this user is deactivated',
  },
  [ER0013]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Unknown error during Graphql googleLogin mutation',
  },
  [ER0014]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql facebookLogin mutation API failed with codes=UNAUTHENTICATED',
  },
  [ER0015]: {
    external: LOGIN_ERROR_MSG,
    internal:
      'Graphql facebookLogin mutation API failed with codes=FORBIDDEN, probably this user is deactivated',
  },
  [ER0016]: {
    external: LOGIN_ERROR_MSG,
    internal: 'Unknown error during Graphql facebookLogin mutation',
  },
  [ER0018]: {
    internal: 'Unexpected error during submitting form data',
  },
  [ER0019]: {
    internal: 'Not submittable',
  },
  [ER0020]: {
    internal: 'Submit work experience failed',
  },
  [ER0021]: {
    internal: 'Warning without validation failure',
  },
};
