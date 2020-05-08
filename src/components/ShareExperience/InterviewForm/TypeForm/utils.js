import {
  equals,
  compose,
  lt,
  lte,
  not,
  type,
  length,
  replace,
  isEmpty,
  isNil,
  join,
  unapply,
  filter,
  map,
  curry,
} from 'ramda';

export const isArray = compose(
  equals('Array'),
  type,
);

export const isNotArray = compose(
  not,
  isArray,
);

export const wordCount = compose(
  length,
  replace(/\n/g, ''),
);

export const parseSalaryAmount = compose(
  Number,
  replace(/,/g, ''),
);
export const isNotSalaryAmount = compose(
  isNaN,
  parseSalaryAmount,
);
export const isSalaryAmount = compose(
  not,
  isNotSalaryAmount,
);

export const isNonEmpty = compose(
  not,
  isEmpty,
);
export const isNonNil = compose(
  not,
  isNil,
);

export const greaterThan = lt;
export const greaterThanOrEqualTo = lte;

export const compact = filter(Boolean);

export const joinCompact = connector =>
  unapply(
    compose(
      join(connector),
      compact,
    ),
  );

export const evolve = curry((evolvers, value) =>
  map(
    evolver => (typeof evolver === 'function' ? evolver(value) : evolver),
    evolvers,
  ),
);
