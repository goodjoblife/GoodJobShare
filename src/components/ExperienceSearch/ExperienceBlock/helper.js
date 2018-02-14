import { formatWithCommas } from '../../../utils/numberUtil';

export const formatType = type => (type === 'interview' ? '面試' : '工作');

export const formatCreatedAt = createdAt => {
  const date = new Date(Date.parse(createdAt));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year} 年 ${month} 月`;
};

export const formatSalaryType = salary => {
  switch (salary.type) {
    case 'year':
      return '年';
    case 'month':
      return '月';
    case 'day':
      return '日';
    default: // 'hour'
      return '小時';
  }
};

export const formatSalaryAmount = salary =>
  formatWithCommas(salary.amount);
