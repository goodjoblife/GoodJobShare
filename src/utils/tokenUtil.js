const TOKEN_KEY_NAME = 'apiToken';

export const saveToken = token =>
  sessionStorage.save(TOKEN_KEY_NAME, token);

export const getToken = () =>
  sessionStorage.getItem(TOKEN_KEY_NAME);
