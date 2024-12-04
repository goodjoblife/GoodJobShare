import {
  equals,
  compose,
  allPass,
  lt,
  lte,
  gt,
  gte,
  not,
  type,
  length,
  replace,
  join,
  unapply,
  filter,
  map,
  curry,
  ifElse,
  isEmpty,
  always,
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

export const isNumber = ifElse(
  isEmpty,
  always(false),
  compose(
    not,
    isNaN,
    Number,
  ),
);

export const greaterThan = lt;
export const greaterThanOrEqualTo = lte;
export const lessThan = gt;
export const lessThanOrEqualTo = gte;

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

export const within = curry((min, max, value) =>
  allPass([greaterThanOrEqualTo(min), lessThanOrEqualTo(max)])(value),
);

export const isValidSalary = curry((type, amount) => {
  const value = parseSalaryAmount(amount);
  switch (type) {
    case 'year':
      return within(10000, 12000000, value);
    case 'month':
      return within(1000, 1000000, value);
    case 'day':
      return within(100, 120000, value);
    case 'hour':
      return within(10, 10000, value);
    default:
      return false;
  }
});
