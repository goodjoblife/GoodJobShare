export const normalizeOptions = options =>
  options.map(option => {
    if (typeof option === 'object') {
      return option;
    } else {
      return { label: `${option}`, value: option };
    }
  });
