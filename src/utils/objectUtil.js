import {
  toSnakecase,
} from './stringUtil';

export const transferKeyToSnakecase = obj => (
  Object.keys(obj).reduce(
    (pV, cV) => ({
      ...pV,
      [toSnakecase(cV)]: obj[cV],
    }),
    {}
  )
);
export const foo = 1;
