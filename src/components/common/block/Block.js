import React, { PropTypes } from 'react';

import Preview from './Preview';
import Content from './Content';

import styles from './Block.module.css';

const Block = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

Block.propTypes = {
  children: PropTypes.node,
};

Block.Preview = Preview;
Block.Content = Content;

export default Block;
