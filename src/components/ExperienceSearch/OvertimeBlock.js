import React, { PropTypes } from 'react';

// import i from 'common/icons';
import { Clock, Coin2 } from 'common/icons';

import styles from './OvertimeBlock.module.css';

const OvertimeBlock = ({ type, heading, data, noDataText }) => (
  <div className={styles.overtimeBlock}>
    <div className={`pMBold ${styles.heading}`}>
      { type === 'salary' ? (<Coin2 />) : (<Clock />) }
      <span>{heading}</span>
    </div>
    {
      data
      ? (<div className={styles.item}>
        <div className={styles.positive}>
          <div>
            <div className={styles.statName}>有</div>
            <ul className={`${styles.positiveStat}`}>
              <li>
                <div className={styles.statHeading}>優於或符合勞基法</div>
                <div className={styles.num}>{data.yes || '-'}</div>
              </li>
              <li>
                <div className={styles.statHeading}>不符合勞基法</div>
                <div className={styles.num}>{data.no || '-'}</div>
              </li>
              <li>
                <div className={styles.statHeading}>不清楚是否符合勞基法</div>
                <div className={styles.num}>{data["don't know"] || '-'}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.negative}>
          <div>
            <div className={styles.negativeStat}>
              <div className={styles.statName}>沒有</div>
              <div className={styles.num}>2</div>
            </div>
            <div className={styles.negativeStat}>
              <div className={styles.statName}>不知道</div>
              <div className={styles.num}>1</div>
            </div>
          </div>
        </div>
      </div>)
      : <div className={`pM ${styles.noData}`}>{noDataText}</div>
    }
  </div>
);

OvertimeBlock.propTypes = {
  type: PropTypes.oneOf(['salary', 'dayoff']),
  heading: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  noDataText: PropTypes.string,
};

OvertimeBlock.defaultProps = {
  type: 'salary',
  noDataText: '資料未達 5 筆',
};

export default OvertimeBlock;
