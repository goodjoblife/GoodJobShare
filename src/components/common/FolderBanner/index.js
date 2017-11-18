import React, { PropTypes } from 'react';

import FolderUpper from '../../images/folder-upper.svg';
import styles from './FolderBanner.module.css';

const FolderBanner = ({ children }) => (
  <div>
    <FolderUpper className={styles['folder-svg']} />
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

FolderBanner.propTypes = {
  children: PropTypes.element,
};

FolderBanner.defaultProps = {
  children: null,
};

export default FolderBanner;
