const STAT_KEYS = [
  'avgSalaryStatistics',
  'nonManagerAvgSalaryStatistics',
  'nonManagerMedianSalaryStatistics',
  'femaleManagerStatistics',
];

export const getAvailableYears = esgSalaryData => {
  const years = new Set();
  STAT_KEYS.forEach(key => {
    (esgSalaryData[key] || []).forEach(item => years.add(item.year));
  });
  return [...years].sort((a, b) => b - a);
};

export const getStatisticsByYear = (esgSalaryData, year) => ({
  avgSalaryStatisticsItem: (esgSalaryData.avgSalaryStatistics || []).find(
    item => item.year === year,
  ),
  nonManagerAvgSalaryStatisticsItem: (
    esgSalaryData.nonManagerAvgSalaryStatistics || []
  ).find(item => item.year === year),
  nonManagerMedianSalaryStatisticsItem: (
    esgSalaryData.nonManagerMedianSalaryStatistics || []
  ).find(item => item.year === year),
  femaleManagerStatisticsItem: (
    esgSalaryData.femaleManagerStatistics || []
  ).find(item => item.year === year),
});
