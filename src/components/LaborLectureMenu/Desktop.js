import React from 'react';
import styles from './LectureMenu.module.css';

const Desktop = ({ children }) => (
  <div className={styles.desktop}>
    {children}
  </div>
);

Desktop.propTypes = {
  children: React.PropTypes.node,
};

export default Desktop;
