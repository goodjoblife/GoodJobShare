import React from 'react';

import { OvertimeStats, YesNoOrUnknownCount } from 'apis/salaryWorkTime';
import { P } from 'common/base';
import Clock from 'common/icons/Clock';
import Coin2 from 'common/icons/Coin2';

import styles from './OvertimeBlock.module.css';

type Props = {
  type: 'salary' | 'dayoff';
  heading: string;
  statistics: OvertimeStats;
};

const formatNum = (num: number | undefined): number | string => {
  if (num === 0 || num === undefined) {
    return '-';
  }
  return num;
};

type SalaryBodyProps = {
  legalCount: YesNoOrUnknownCount | null;
  overtimeSalaryCount: YesNoOrUnknownCount | null;
};

const SalaryBody: React.FC<SalaryBodyProps> = ({
  legalCount,
  overtimeSalaryCount,
}) => (
  <div className={styles.item}>
    <div className={styles.positive}>
      <div>
        <div className={styles.statName}>有</div>
        <ul className={styles.positiveStat}>
          <li>
            <div className={styles.statHeading}>優於或符合勞基法</div>
            <div className={styles.num}>
              {formatNum(legalCount ? legalCount.yes : undefined)}
            </div>
          </li>
          <li>
            <div className={styles.statHeading}>不符合勞基法</div>
            <div className={styles.num}>
              {formatNum(legalCount ? legalCount.no : undefined)}
            </div>
          </li>
          <li>
            <div className={styles.statHeading}>不清楚是否符合勞基法</div>
            <div className={styles.num}>
              {formatNum(legalCount ? legalCount.unknown : undefined)}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className={styles.negative}>
      <div>
        <div className={styles.negativeStat}>
          <div className={styles.statName}>沒有</div>
          <div className={styles.num}>
            {formatNum(
              overtimeSalaryCount ? overtimeSalaryCount.no : undefined,
            )}
          </div>
        </div>
        <div className={styles.negativeStat}>
          <div className={styles.statName}>不知道</div>
          <div className={styles.num}>
            {formatNum(
              overtimeSalaryCount ? overtimeSalaryCount.unknown : undefined,
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

type DayoffBodyProps = {
  dayoffCount: YesNoOrUnknownCount | null;
};

const DayoffBody: React.FC<DayoffBodyProps> = ({ dayoffCount }) => (
  <div className={styles.item}>
    <div className={styles.positive}>
      <div>
        <div className={styles.statName}>有</div>
        <div className={styles.num}>
          {formatNum(dayoffCount ? dayoffCount.yes : undefined)}
        </div>
      </div>
    </div>
    <div className={styles.negative}>
      <div>
        <div className={styles.negativeStat}>
          <div className={styles.statName}>沒有</div>
          <div className={styles.num}>
            {formatNum(dayoffCount ? dayoffCount.no : undefined)}
          </div>
        </div>
        <div className={styles.negativeStat}>
          <div className={styles.statName}>不知道</div>
          <div className={styles.num}>
            {formatNum(dayoffCount ? dayoffCount.unknown : undefined)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OvertimeBlock: React.FC<Props> = ({ type, heading, statistics }) => (
  <div className={styles.overtimeBlock}>
    <P className={styles.heading}>
      {type === 'salary' ? <Coin2 /> : <Clock />}
      <P Tag="h3" size="m" bold>
        {heading}
      </P>
    </P>
    {statistics.count >= 5 ? (
      type === 'salary' ? (
        <SalaryBody
          legalCount={statistics.is_overtime_salary_legal_count}
          overtimeSalaryCount={statistics.has_overtime_salary_count}
        />
      ) : (
        <DayoffBody dayoffCount={statistics.has_compensatory_dayoff_count} />
      )
    ) : (
      <div className={styles.noData}>資料未達五筆</div>
    )}
  </div>
);

export default OvertimeBlock;
