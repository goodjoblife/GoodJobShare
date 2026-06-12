import PropTypes from 'prop-types';
import { replace } from 'ramda';
import React from 'react';

import { pageTypeTranslation } from 'constants/companyJobTitle';

import styles from './AutoCompleteItem.module.css';

const dropBusinessNumber = replace(/ \(\d+\)$/, '');

const AutoCompleteItem = ({ pageType, name, businessNumber }) => (
  <div className={styles.container}>
    <div>
      <span className={styles.badge}>{pageTypeTranslation[pageType]}</span>
    </div>
    <div className={styles.name}>
      {dropBusinessNumber(name)}{' '}
      {businessNumber && `（統編：${businessNumber}）`}
    </div>
  </div>
);

AutoCompleteItem.propTypes = {
  businessNumber: PropTypes.string,
  name: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
};

export default AutoCompleteItem;
