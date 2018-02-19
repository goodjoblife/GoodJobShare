export const formatSalaryAmount = amount =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatSalaryType = type => {
  switch (type) {
    case 'year':
      return '年';
    case 'month':
      return '月';
    case 'hour':
      return '小時';
    default:
      return '月';
  }
};
