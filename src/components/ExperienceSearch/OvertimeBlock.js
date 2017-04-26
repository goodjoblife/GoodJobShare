import React, { PropTypes } from 'react';

import Heart from '../images/heart.svg';

import styles from './OvertimeBlock.module.css';

const OvertimeBlock = ({ heading, noData, noDataText }) => (
  <div>
    <div className={`pMBold ${styles.heading}`}>
      <Heart />
      <span>{heading}</span>
    </div>
    {
      noData
      ? <div className={`pM ${styles.noData}`}>{noDataText}</div>
      : (<div className={`pMBold ${styles.data}`}>

        <div className={styles.positive}>
          <div className={styles.stat}>
            <div>有</div>
            <div className="pS">
              <div className={styles.subStat}>
                <div>優於或符合勞基法</div>
                <div>3</div>
              </div>
              <div className={styles.subStat}>
                <div>不符合勞基法</div>
                <div>-</div>
              </div>
              <div className={styles.subStat}>
                <div>不清楚是否符合勞基法</div>
                <div>5</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.spacer} />

        <div className={styles.negative}>
          <div className={styles.stat}>
            <div>沒有</div>
            <div>2</div>
          </div>
          <div className={styles.stat}>
            <div>不知道</div>
            <div>1</div>
          </div>
        </div>

      </div>)
    }
  </div>
);

OvertimeBlock.propTypes = {
  heading: PropTypes.string,
  noData: PropTypes.bool,
  noDataText: PropTypes.string,
};

OvertimeBlock.defaultProps = {
  noDataText: '資料未達 5 筆',
};

export default OvertimeBlock;
