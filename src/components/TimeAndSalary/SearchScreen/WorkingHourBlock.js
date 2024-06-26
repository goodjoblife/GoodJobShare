import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'common/base';
import { Link } from 'react-router-dom';

import styles from './WorkingHourBlock.module.css';
import { pageTypeTranslation } from 'constants/companyJobTitle';

const WorkingHourBlock = ({
  pageType,
  name,
  businessNumber,
  to,
  dataCount,
}) => (
  <section className={styles.container}>
    <Link className={styles.linkBlock} to={to}>
      <div className={styles.headingWrapper}>
        <div className={styles.pageTypeBlock}>
          <span className={styles.pageTypeBadge}>
            {pageTypeTranslation[pageType]}
          </span>
        </div>
        <Heading size="sm" className={styles.headingBlock}>
          {name}
          {businessNumber && (
            <span className={styles.businessNumber}>
              （統編：{businessNumber}）
            </span>
          )}
        </Heading>
        {typeof dataCount !== 'undefined' && (
          <div className={styles.averageBlock}>
            <span className={styles.averageBlockValue}>{dataCount} 筆資訊</span>
          </div>
        )}
      </div>
    </Link>
  </section>
);

WorkingHourBlock.propTypes = {
  businessNumber: PropTypes.string,
  dataCount: PropTypes.number,
  name: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default WorkingHourBlock;
