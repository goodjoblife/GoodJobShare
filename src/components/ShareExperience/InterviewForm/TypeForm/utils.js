import {
  equals,
  compose,
  lt,
  lte,
  not,
  type,
  length,
  replace,
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

export const isNot = curry((fn, value) =>
  compose(
    not,
    fn,
  )(value),
);

export const wordCount = compose(
  length,
  replace(/\n/g, ''),
);

export const parseSalaryAmount = compose(
  Number,
  replace(/,/g, ''),
);
export const isSalaryAmount = compose(
  not,
  isNaN,
  parseSalaryAmount,
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
