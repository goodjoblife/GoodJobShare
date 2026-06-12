import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { Heading } from 'common/base';
import { pageTypeTranslation } from 'constants/companyJobTitle';

import styles from './CompanyJobTitleBlock.module.css';

const CompanyJobTitleBlock = ({
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

CompanyJobTitleBlock.propTypes = {
  businessNumber: PropTypes.string,
  dataCount: PropTypes.number,
  name: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default CompanyJobTitleBlock;
