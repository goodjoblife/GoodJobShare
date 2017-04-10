import React from 'react';
import styles from './Container.module.css';

const Desktop = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

Desktop.propTypes = {
  children: React.PropTypes.node,
};

export default Desktop;
