const STAT_KEYS = [
  'avgSalaryStatistics',
  'nonManagerAvgSalaryStatistics',
  'nonManagerMedianSalaryStatistics',
  'femaleManagerStatistics',
];

export const getAvailableYears = esgSalaryData => {
  if (!esgSalaryData) return [];
  const years = new Set();
  STAT_KEYS.forEach(key => {
    (esgSalaryData[key] || []).forEach(item => years.add(item.year));
  });
  return [...years].sort((a, b) => b - a);
};

export const getStatisticsByYear = (esgSalaryData, year) => {
  const data = esgSalaryData || {};
  return {
    avgSalaryStatisticsItem: (data.avgSalaryStatistics || []).find(
      item => item.year === year,
    ),
    nonManagerAvgSalaryStatisticsItem: (
      data.nonManagerAvgSalaryStatistics || []
    ).find(item => item.year === year),
    nonManagerMedianSalaryStatisticsItem: (
      data.nonManagerMedianSalaryStatistics || []
    ).find(item => item.year === year),
    femaleManagerStatisticsItem: (data.femaleManagerStatistics || []).find(
      item => item.year === year,
    ),
  };
};
