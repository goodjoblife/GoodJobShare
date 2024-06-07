import React from 'react';
import styles from './AutoCompleteItem.module.css';
import { pageTypeTranslation } from 'constants/companyJobTitle';

const AutoCompleteItem = ({ pageType, name, businessNumber }) => (
  <div className={styles.container}>
    <div>
      <span className={styles.badge}>{pageTypeTranslation[pageType]}</span>
    </div>
    <div className={styles.name}>
      <span>{name}</span>
      <span>{businessNumber && `（統編：${businessNumber}）`}</span>
    </div>
  </div>
);

export default AutoCompleteItem;
