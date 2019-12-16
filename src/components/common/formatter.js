export const formatSalaryAmount = amount =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const getSalaryAmountRangeSize = type => {
  switch (type) {
    case 'year':
      return 720000;
    case 'month':
      return 60000;
    case 'day':
      return 2000;
    case 'hour':
      return 100;
    default:
      return 10000;
  }
};

const getSalaryAmountRange = salary => {
  const rangeSize = getSalaryAmountRangeSize(salary.type);
  return [
    Math.floor(salary.amount / rangeSize) * rangeSize,
    Math.ceil(salary.amount / rangeSize) * rangeSize,
  ];
};

export const formatSalaryAmountRange = salary => {
  if (!salary) {
    return '-';
  }
  const [head, tail] = getSalaryAmountRange(salary);
  return `${formatSalaryAmount(head)} ~ ${formatSalaryAmount(tail)}`;
};

export const formatSalaryType = type => {
  switch (type) {
    case 'year':
      return '年';
    case 'month':
      return '月';
    case 'day':
      return '日';
    case 'hour':
      return '小時';
    default:
      return '月';
  }
};

export const formatSalary = salary => {
  if (!salary) {
    return '-';
  }

  const { amount, type } = salary;

  return `${formatSalaryAmount(amount)} / ${formatSalaryType(type)}`;
};

export const formatSalaryRange = salary => {
  if (!salary) {
    return '';
  }

  return `${formatSalaryAmountRange(salary)} / ${formatSalaryType(
    salary.type,
  )}`;
};
