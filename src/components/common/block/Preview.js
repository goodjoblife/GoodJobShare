import React, { PropTypes } from 'react';

import styles from './Preview.module.css';

// const test = () => {
//   console.log('test');
// };

const Preview = ({ children }) => (
  <button
    className={styles.preview} onClick={() => {
      console.log('why');
    }}
  >
    Preview: {children}
  </button>
);

Preview.propTypes = {
  children: PropTypes.node,
};

export default Preview;
