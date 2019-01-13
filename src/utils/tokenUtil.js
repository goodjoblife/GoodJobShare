import { path } from 'ramda';

const TOKEN_KEY_NAME = 'persist:goodjob';

const checkStorage = () => typeof localStorage !== 'undefined';

export const getToken = () => {
  // FIXME: remove this util
  if (checkStorage()) {
    const localData = JSON.parse(
      JSON.parse(JSON.parse(localStorage.getItem(TOKEN_KEY_NAME)).auth),
    );
    return path(['data', 'token'])(localData);
  }
  return null;
};
