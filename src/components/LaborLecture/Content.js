import React from 'react';
import styles from './Lecture.module.css';

const Content = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
