import React from 'react';
import styles from './Body.module.css';

const Body = ({ children }) => (
  <div className={styles.body}>
    {children}
  </div>
);

Body.propTypes = {
  children: React.PropTypes.node,
};

export default Body;
