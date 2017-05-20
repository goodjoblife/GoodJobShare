export const gteLength = legnth => l => l.length >= legnth;
export const gtLength = legnth => l => l.length > legnth;
export const lteLength = legnth => l => l.length <= legnth;
export const ltLength = legnth => l => l.length < legnth;
export const eqLength = length => l => l.length === length;
export const notStrEmpty = str => str.trim() !== '';
export const notArrayEmpty = arr => arr.length !== 0;
export const notNullOrUndefined = t => t !== null && t !== undefined;
