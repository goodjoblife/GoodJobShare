import React, { PropTypes } from 'react';

import styles from './Content.module.css';

const Content = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
