export const SET_LOGIN = '@@auth/SET_LOGIN';

export const setLogin = (status, token = null) => ({
  type: SET_LOGIN,
  status,
  token,
});
