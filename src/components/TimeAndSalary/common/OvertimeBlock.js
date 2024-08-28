import React from 'react';
import PropTypes from 'prop-types';
import Clock from 'common/icons/Clock';
import Coin2 from 'common/icons/Coin2';
import { P } from 'common/base';
import styles from './OvertimeBlock.module.css';

const formatNum = num => {
  if (num === 0 || num === undefined) {
    return '-';
  }
  return num;
};

const OvertimeBlock = ({ type, heading, statistics }) => (
  <div className={styles.overtimeBlock}>
    <P Tag="h4" size="m" bold className={styles.heading}>
      {type === 'salary' ? <Coin2 /> : <Clock />}
      <span>{heading}</span>
    </P>
    {statistics.count >= 5 ? (
      <div className={styles.item}>
        <div className={styles.positive}>
          <div>
            <div className={styles.statName}>有</div>
            {type === 'salary' ? (
              <ul className={`${styles.positiveStat}`}>
                <li>
                  <div className={styles.statHeading}>優於或符合勞基法</div>
                  <div className={styles.num}>
                    {formatNum(statistics.is_overtime_salary_legal_count.yes)}
                  </div>
                </li>
                <li>
                  <div className={styles.statHeading}>不符合勞基法</div>
                  <div className={styles.num}>
                    {formatNum(statistics.is_overtime_salary_legal_count.no)}
                  </div>
                </li>
                <li>
                  <div className={styles.statHeading}>不清楚是否符合勞基法</div>
                  <div className={styles.num}>
                    {formatNum(
                      statistics.is_overtime_salary_legal_count.unknown,
                    )}
                  </div>
                </li>
              </ul>
            ) : (
              <div className={styles.num}>
                {formatNum(statistics.has_compensatory_dayoff_count.yes)}
              </div>
            )}
          </div>
        </div>
        <div className={styles.negative}>
          <div>
            <div className={styles.negativeStat}>
              <div className={styles.statName}>沒有</div>
              <div className={styles.num}>
                {type === 'salary'
                  ? formatNum(statistics.has_overtime_salary_count.no)
                  : formatNum(statistics.has_compensatory_dayoff_count.no)}
              </div>
            </div>
            <div className={styles.negativeStat}>
              <div className={styles.statName}>不知道</div>
              <div className={styles.num}>
                {type === 'salary'
                  ? formatNum(statistics.has_overtime_salary_count.unknown)
                  : formatNum(statistics.has_compensatory_dayoff_count.unknown)}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.noData}>資料未達五筆</div>
    )}
  </div>
);

OvertimeBlock.propTypes = {
  heading: PropTypes.string.isRequired,
  statistics: PropTypes.shape({
    average_estimated_hourly_wage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    has_compensatory_dayoff_count: PropTypes.shape({
      no: PropTypes.number.isRequired,
      unknown: PropTypes.number.isRequired,
      yes: PropTypes.number.isRequired,
    }).isRequired,
    has_overtime_salary_count: PropTypes.shape({
      no: PropTypes.number.isRequired,
      unknown: PropTypes.number.isRequired,
      yes: PropTypes.number.isRequired,
    }).isRequired,
    is_overtime_salary_legal_count: PropTypes.shape({
      no: PropTypes.number.isRequired,
      unknown: PropTypes.number.isRequired,
      yes: PropTypes.number.isRequired,
    }),
  }).isRequired,
  type: PropTypes.oneOf(['salary', 'dayoff']).isRequired,
};

OvertimeBlock.defaultProps = {
  type: 'salary',
};

export default OvertimeBlock;
