export const debounce = (func, delay) => {
  let inDebounce;
  return (...args) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);

    return inDebounce;
  };
};

export const foo = 1;
