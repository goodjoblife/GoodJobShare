import React, { PropTypes } from 'react';

import i from 'common/icons';

import styles from './OvertimeBlock.module.css';

const OvertimeBlock = ({ heading, data, noDataText }) => (
  <div>
    <div className={`pMBold ${styles.heading}`}>
      <i.X />
      <span>{heading}</span>
    </div>
    {
      data
      ? (<div className={`pMBold ${styles.data}`}>

        <div className={styles.positive}>
          <div className={styles.stat}>
            <div>有</div>
            <div className="pS">
              <div className={styles.subStat}>
                <div>優於或符合勞基法</div>
                <div>{data.yes || '-'}</div>
              </div>
              <div className={styles.subStat}>
                <div>不符合勞基法</div>
                <div>{data.no || '-'}</div>
              </div>
              <div className={styles.subStat}>
                <div>不清楚是否符合勞基法</div>
                <div>{data["don't know"] || '-'}</div>
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
      : <div className={`pM ${styles.noData}`}>{noDataText}</div>
    }
  </div>
);

OvertimeBlock.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.object,
  noDataText: PropTypes.string,
};

OvertimeBlock.defaultProps = {
  noDataText: '資料未達 5 筆',
};

export default OvertimeBlock;
