import React, { PropTypes } from 'react';

import FolderUpper from '../../images/folder-upper.svg';
import styles from './FolderBanner.module.css';

const FolderBanner = ({ children, rootClassName }) => (
  <div className={rootClassName}>
    <FolderUpper className={styles['folder-svg']} />
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

FolderBanner.propTypes = {
  children: PropTypes.element,
  rootClassName: PropTypes.string,
};

FolderBanner.defaultProps = {
  children: null,
  rootClassName: '',
};

export default FolderBanner;
