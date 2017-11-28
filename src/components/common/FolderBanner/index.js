import React, { PropTypes } from 'react';

import FolderUpper from '../../images/folder-upper.png';
import styles from './FolderBanner.module.css';

const FolderBanner = ({ children, rootClassName }) => (
  <div className={rootClassName}>
    <img src={FolderUpper} alt="foler-upper" />
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
