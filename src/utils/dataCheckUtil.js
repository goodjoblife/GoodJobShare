export const gteLength = legnth => l => l.length >= legnth;
export const gtLength = legnth => l => l.length > legnth;
export const lteLength = legnth => l => l.length <= legnth;
export const ltLength = legnth => l => l.length < legnth;
export const eqLength = length => l => l.length === length;
export const notStrEmpty = str => str.trim() !== '';
export const notArrayEmpty = arr => arr.length !== 0;
export const notNullOrUndefined = t => t !== null && t !== undefined;
export const validateEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
