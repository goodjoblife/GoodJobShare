export const toSnakecase = str =>
  str.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);

export const toCamelcase = str =>
  str.replace(/(_[a-z])/g, $1 => $1.toUpperCase().replace('_', ''));

export const makeId = (length = 5) =>
  Math.random()
    .toString(36)
    .substring(2, length);

// find the n-th occurrence of substr in str.
// when n = 1, it will be equal to indexOf
export const nthIndexOf = (str, substr, n) => {
  if (!str || !substr) {
    return -1;
  }
  let pos = 0;
  for (let i = 0; i < n; i += 1) {
    pos = str.indexOf(substr, pos === 0 ? 0 : pos + substr.length);
    if (pos < 0) {
      return pos;
    }
  }
  return pos;
};

// format: 3000 -> "3,000"
export const formatCommaSeparatedNumber = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
