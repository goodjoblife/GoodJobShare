import cn from 'classnames';
import React from 'react';

import {
  JobAverageSalary,
  OvertimeFrequencyCount,
  SalaryDistributionBin,
} from 'apis/salaryWorkTime';
import { Heading } from 'common/base';

import styles from '../Overview/Overview.module.css';
import SummaryBlock from '../Overview/SummaryBlock';

type Props = {
  salaryDistribution?: SalaryDistributionBin[];
  jobAverageSalaries?: JobAverageSalary[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

const SummarySection: React.FC<Props> = ({
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => {
  return (
    <div className={styles.snippet}>
      <Heading className={cn(styles.title, styles.aboveCard)} Tag="h2">
        本站使用者分享之薪資、加班資訊
      </Heading>
      <SummaryBlock
        salaryDistribution={salaryDistribution}
        jobAverageSalaries={jobAverageSalaries}
        averageWeekWorkTime={averageWeekWorkTime}
        overtimeFrequencyCount={overtimeFrequencyCount}
      />
    </div>
  );
};

export default SummarySection;
