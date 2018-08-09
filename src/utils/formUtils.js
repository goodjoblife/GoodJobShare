/**
 * convert number to [xxxx億][xxxx萬][xxxx]元 format
 * @param {Integer} num the number to be converted
 */
const numToChineseReadableString = num => {
  if (num <= 0) {
    return null;
  }
  const base = [1, 10000, 100000000];
  const baseWord = ['', '萬', '億'];

  let str = '';
  let c;
  let tmpNum = num;
  for (let i = base.length - 1; i >= 0; i -= 1) {
    if (tmpNum >= base[i]) {
      c = Math.floor(tmpNum / base[i]);
      tmpNum -= c * base[i];
      str += `${c}${baseWord[i]}`;
    }
  }
  return `${str}元`;
};

/**
 * Decide whether to show salary warning
 * @param {String} salaryType the type of salary (hour, day, month, year)
 * @param {Integer} salaryAmount the amount of salary
 */
const shouldShowSalaryWarning = (salaryType, salaryAmount) => {
  const ranges = {
    hour: [100, 500],
    day: [800, 4000],
    month: [20000, 100000], // 2萬, 10萬
    year: [200000, 1000000], // 20萬, 100萬
  };
  if (!(salaryType in ranges)) {
    return false;
  }
  if (
    salaryAmount < ranges[salaryType][0] ||
    salaryAmount > ranges[salaryType][1]
  ) {
    return true;
  }
  return false;
};

/**
 * Combine converting and checking warning task for salary field
 * @param {String} salaryType the type of salary (hour, day, month, year)
 * @param {String} salaryAmount the amount of salary
 */
const salaryHint = (salaryType, salaryAmount) => {
  const amount = parseInt(salaryAmount, 10);
  if (isNaN(amount)) {
    return { showWarning: false, hint: null };
  }
  const readableStr = numToChineseReadableString(amount);
  const showWarning = shouldShowSalaryWarning(salaryType, amount);
  const salaryTypeWord = {
    hour: '時薪',
    day: '日薪',
    month: '月薪',
    year: '年薪',
  };

  if (readableStr !== null && salaryType in salaryTypeWord) {
    const hint = `${salaryTypeWord[salaryType]} ${readableStr}`;
    return { showWarning, hint };
  }
  return { showWarning, hint: null };
};

export default salaryHint;
