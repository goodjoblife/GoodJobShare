import React, { PropTypes } from 'react';

import styles from './Block.module.css';

const Block = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

Block.propTypes = {
  children: PropTypes.node,
};

export default Block;
