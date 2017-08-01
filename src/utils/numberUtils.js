/*
  Get the scale number of given number
  For instance, 55 => 50, 1234 => 1000, 3456 => 3000
  (The highest digit padding with zeros)
*/
const getScale = num => {
  let base = 1;
  let current = num;
  while (Math.floor(current / 10) !== 0) {
    base *= 10;
    current = Math.floor(current / 10);
  }
  return current * base;
};

export default getScale;
