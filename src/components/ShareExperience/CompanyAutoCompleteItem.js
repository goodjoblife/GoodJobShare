import React from 'react';
import styles from './CompanyAutoCompleteItem.module.css';

const CompanyAutoCompleteItem = ({ name, businessNumber }) => (
  <div className={styles.container}>
    <div>
      <span className={styles.badge}>公司</span>
    </div>
    <div className={styles.name}>
      <span>{name}</span>
      <span>{businessNumber && `（統編：${businessNumber}）`}</span>
    </div>
  </div>
);

export default CompanyAutoCompleteItem;
