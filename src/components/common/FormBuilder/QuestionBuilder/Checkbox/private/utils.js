import R from 'ramda';

export const toggle = (value, values) => {
  if (R.contains(value, values)) {
    return R.without(value, values);
  } else {
    return R.append(value, values);
  }
};

export const normalizeOptions = options =>
  options.map(option => {
    if (typeof option === 'object') {
      const { label, value } = option;
      return { label, value };
    } else {
      return { label: `${option}`, value: option };
    }
  });
