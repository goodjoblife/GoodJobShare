export const ifThenLog = func => logMessage => arg => {
  if (process.env.NODE_ENV === 'production') {
    return arg;
  }

  if (func(arg)) {
    console.log(logMessage);
    return arg;
  }

  return arg;
};

export const foo = 1;
