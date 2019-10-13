import {
  formatSalaryAmount,
  formatSalaryAmountRange,
  formatSalaryType,
} from 'common/formatter';

export const formatCreatedAt = createdAt => {
  const date = new Date(Date.parse(createdAt));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year} 年 ${month} 月`;
};

export const formatWeekWorkTime = weekWorkTime => `${weekWorkTime} 小時 / 週`;

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

export const formatRecommendToOthers = recommendToOthers =>
  recommendToOthers === 'yes' ? '推' : '不推';
