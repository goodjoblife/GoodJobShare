import React, { PropTypes } from 'react';

import styles from './Block.module.css';

const Block = ({ children }) => (
  <section className={styles.container}>
    {children}
  </section>
);

Block.propTypes = {
  children: PropTypes.node,
};

export default Block;
