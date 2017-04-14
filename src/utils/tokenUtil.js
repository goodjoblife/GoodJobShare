const TOKEN_KEY_NAME = 'apiToken';

const checkSessionStorage = () =>
  typeof sessionStorage !== 'undefined';

export const saveToken = token =>
  (checkSessionStorage() ? sessionStorage.save(TOKEN_KEY_NAME, token) : null);

export const getToken = () =>
  (checkSessionStorage() ? sessionStorage.getItem(TOKEN_KEY_NAME) : null);
