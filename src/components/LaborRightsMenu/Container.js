import React from 'react';
import styles from './Container.module.css';

const Container = ({ children }) => (
  <div className={styles.desktop}>
    {children}
  </div>
);

Container.propTypes = {
  children: React.PropTypes.node,
};

export default Container;
