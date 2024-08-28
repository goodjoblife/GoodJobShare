export const formatCreatedAt = createdAt => {
  const date = new Date(Date.parse(createdAt));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year} 年 ${month} 月`;
};

export const formatWeekWorkTime = weekWorkTime => `${weekWorkTime} 小時 / 週`;

export const formatRecommendToOthers = recommendToOthers =>
  recommendToOthers === 'yes' ? '推' : '不推';
