
/**
 * convert number to [xxxx億][xxxx萬][xxxx]元 format
 * @param {*} num the number to be converted
 */
export const numToChineseReadableString = num => {
  let tmpNum = parseInt(num, 10);
  if (isNaN(tmpNum) || num <= 0) {
    return null;
  }
  const base = [1, 10000, 100000000];
  const baseWord = ['', '萬', '億'];

  let str = '';
  let c;
  for (let i = base.length; i >= 0; i -= 1) {
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
 * @param {*} salaryType the type of salary (hour, day, month, year)
 * @param {*} salaryAmount the amount of salary
 */
export const shouldShowSalaryWarning = (salaryType, salaryAmount) => {
  const amount = parseInt(salaryAmount, 10);
  if (isNaN(amount)) {
    return false;
  }
  const ranges = {
    hour: [100, 500],
    day: [800, 4000],
    month: [20000, 100000], // 2萬, 10萬
    year: [200000, 1000000], // 20萬, 100萬
  };
  if (!(salaryType in ranges)) {
    return false;
  }
  if (amount < ranges[salaryType][0] || amount > ranges[salaryType][1]) {
    return true;
  }
  return false;
};

/**
 * Combine converting and checking warning task for salary field
 * @param {*} salaryType the type of salary (hour, day, month, year)
 * @param {*} salaryAmount the amount of salary
 */
export const salaryHint = (salaryType, salaryAmount) => {
  const readableStr = numToChineseReadableString(salaryAmount);
  const showWarning = shouldShowSalaryWarning(salaryType, salaryAmount);
  const salaryTypeWord = {
    hour: '時薪',
    day: '日薪',
    month: '月薪',
    year: '年薪',
  };

  let hint = null;
  if (readableStr !== null && salaryType in salaryTypeWord) {
    hint = `${salaryTypeWord[salaryType]} ${readableStr}`;
  }
  return { showWarning, hint };
};
