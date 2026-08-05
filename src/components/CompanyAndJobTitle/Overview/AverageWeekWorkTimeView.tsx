import React from 'react';

import { OvertimeFrequencyCount } from 'apis/salaryWorkTime';

import AbstractView from '../AbstractView';

const ratioOfType = (
  overtimeFrequencyCount: OvertimeFrequencyCount,
  type: keyof OvertimeFrequencyCount,
): number => {
  const total = Object.values(overtimeFrequencyCount).reduce(
    (sum, count) => sum + count,
    0,
  );
  return overtimeFrequencyCount[type] / total;
};

type AverageWeekWorkTimeViewProps = {
  averageWeekWorkTime: number;
  // 呼叫端（SummaryBlock 的 WorkTimeCard）在沒有資料時改顯示空狀態圖，
  // 但 children 仍會先被建出來，因此這裡收得下 null
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

const AverageWeekWorkTimeView: React.FC<AverageWeekWorkTimeViewProps> = ({
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => {
  if (!overtimeFrequencyCount) return null;

  const almostEverydayRatio = ratioOfType(
    overtimeFrequencyCount,
    'almost_everyday',
  );
  const sometimesRatio = ratioOfType(overtimeFrequencyCount, 'sometimes');

  return (
    <AbstractView
      title="平均每週上班"
      value={averageWeekWorkTime.toFixed(0)}
      valueSuffix="小時"
      footer={`${(almostEverydayRatio * 100).toFixed(0)}% 幾乎每天加班，${(
        sometimesRatio * 100
      ).toFixed(0)}% 偶爾加班`}
    />
  );
};

export default AverageWeekWorkTimeView;
