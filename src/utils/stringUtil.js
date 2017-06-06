export const toSnakecase = str =>
  str.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);

export const toCamelcase = str =>
  str.replace(/(_[a-z])/g, $1 => $1.toUpperCase().replace('_', ''));

export const makeId = (length = 5) => (
  Math.random().toString(36).substring(2, length)
);
