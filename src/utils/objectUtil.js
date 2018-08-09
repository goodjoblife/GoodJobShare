import R from 'ramda';

import { toSnakecase } from './stringUtil';

export const transferKeyToSnakecase = obj =>
  Object.keys(obj).reduce(
    (pV, cV) => ({
      ...pV,
      [toSnakecase(cV)]: obj[cV],
    }),
    {}
  );
export const foo = 1;

export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);
