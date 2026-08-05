import React from 'react';
import { Link } from 'react-router-dom';

import { Heading } from 'common/base';
import { PageType, pageTypeTranslation } from 'constants/companyJobTitle';

import styles from './CompanyJobTitleBlock.module.css';

type CompanyJobTitleBlockProps = {
  pageType: PageType;
  name: string;
  to: string;
  // 職稱沒有統編，職稱的搜尋結果也不含 dataCount 以外的欄位
  businessNumber?: string | null;
  dataCount?: number;
};

const CompanyJobTitleBlock: React.FC<CompanyJobTitleBlockProps> = ({
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

export default CompanyJobTitleBlock;
