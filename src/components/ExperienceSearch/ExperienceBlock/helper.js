import {
  formatSalaryAmount,
  formatSalaryType,
} from 'common/formatter';

export const formatType = type => {
  switch (type) {
    case 'work':
      return '工作';
    case 'interview':
      return '面試';
    case 'intern':
      return '實習';
    default:
      return '工作';
  }
};

export const formatCreatedAt = createdAt => {
  const date = new Date(Date.parse(createdAt));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year} 年 ${month} 月`;
};

export const formatSalary = salary => {
  if (!salary) {
    return '-';
  }

  const { amount, type } = salary;

  return `${formatSalaryAmount(amount)} / ${formatSalaryType(type)}`;
};
