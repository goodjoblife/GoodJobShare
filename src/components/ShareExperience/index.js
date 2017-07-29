import React, { PropTypes } from 'react';

import styles from './ShareExperience.module.css';

const ShareExperience = ({ children }) => (
  <div
    className={styles.container}
  >
    {children}
  </div>
);

ShareExperience.propTypes = {
  children: PropTypes.node,
};

export default ShareExperience;
