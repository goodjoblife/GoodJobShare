import React from 'react';
import PropTypes from 'prop-types';
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

AutoCompleteItem.propTypes = {
  businessNumber: PropTypes.string,
  name: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
};

export default AutoCompleteItem;
