import React, { PropTypes } from 'react';

import { Clock, Coin2 } from 'common/icons';
import { P } from 'common/base';
import styles from './OvertimeBlock.module.css';

const formatNum = num => {
  if (num === 0 || num === undefined) {
    return '-';
  }
  return num;
};

const OvertimeBlock = ({ type, heading, data }) => (
  <div className={styles.overtimeBlock}>
    <P Tag="h4" size="m" bold className={styles.heading}>
      { type === 'salary' ? <Coin2 /> : <Clock /> }
      <span>{heading}</span>
    </P>
    { data.count > 5 ? <div className={styles.item}>
      <div className={styles.positive}>
        <div>
          <div className={styles.statName}>有</div>
          { type === 'salary' ?
            <ul className={`${styles.positiveStat}`}>
              <li>
                <div className={styles.statHeading}>優於或符合勞基法</div>
                <div className={styles.num}>{formatNum(data.is_overtime_salary_legal_count.ye)}</div>
              </li>
              <li>
                <div className={styles.statHeading}>不符合勞基法</div>
                <div className={styles.num}>{formatNum(data.is_overtime_salary_legal_count.no)}</div>
              </li>
              <li>
                <div className={styles.statHeading}>不清楚是否符合勞基法</div>
                <div className={styles.num}>{formatNum(data.is_overtime_salary_legal_count["don't know"])}</div>
              </li>
            </ul>
          : <div className={styles.num}>{formatNum(data.has_compensatory_dayoff_count.yes)}</div> }
        </div>
      </div>
      <div className={styles.negative}>
        <div>
          <div className={styles.negativeStat}>
            <div className={styles.statName}>沒有</div>
            <div className={styles.num}>
              { type === 'salary'
                ? formatNum(data.has_overtime_salary_count.no)
                : formatNum(data.has_compensatory_dayoff_count.no) }
            </div>
          </div>
          <div className={styles.negativeStat}>
            <div className={styles.statName}>不知道</div>
            <div className={styles.num}>
              { type === 'salary'
                ? formatNum(data.has_overtime_salary_count["don't know"])
                : formatNum(data.has_compensatory_dayoff_count["don't know"]) }
            </div>
          </div>
        </div>
      </div>
    </div>
    : <div className={styles.noData}>資料未達五筆</div> }
  </div>
);

OvertimeBlock.propTypes = {
  type: PropTypes.oneOf(['salary', 'dayoff']).isRequired,
  data: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
};

OvertimeBlock.defaultProps = {
  type: 'salary',
};

export default OvertimeBlock;
