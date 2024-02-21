export const normalizeOptions = options =>
  options.map(option => {
    if (typeof option === 'object') {
      const { label, value } = option;
      return { label, value };
    } else {
      return { label: `${option}`, value: option };
    }
  });
