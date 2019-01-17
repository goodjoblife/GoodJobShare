import { path } from 'ramda';

const TOKEN_KEY_NAME = 'persist:goodjob';

const checkStorage = () => typeof localStorage !== 'undefined';

export const getToken = () => {
  // FIXME: remove this util
  if (checkStorage()) {
    const item = localStorage.getItem(TOKEN_KEY_NAME);
    if (item) {
      const localData = JSON.parse(JSON.parse(JSON.parse(item).auth));
      return path(['data', 'token'])(localData);
    }
  }
  return null;
};
