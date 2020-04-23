import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShieldAlt from '@fortawesome/fontawesome-free-solid/faShieldAlt';
import styles from './TypeFormHeader.module.css';

export default () => (
  <div className={cn(styles.header, styles.ctaHeader)}>
    <div className={styles.privacyPolicy}>
      <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
      資訊將受永久匿名保護
    </div>
    <div className={styles.title}>請輸入你的一份工作經驗</div>
  </div>
);

export const CompanyJobTitleHeader = ({ pageName, companyName, jobTitle }) => (
  <div className={cn(styles.header, styles.jobTitleHeader)}>
    <div className={styles.privacyPolicy}>
      <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
    </div>
    <div className={styles.jobTitle}>
      <div>
        <span className={styles.badge}>{pageName}</span>
      </div>
      <div className={styles.name}>
        {companyName} {jobTitle}
      </div>
    </div>
  </div>
);

CompanyJobTitleHeader.propTypes = {
  pageName: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
};
