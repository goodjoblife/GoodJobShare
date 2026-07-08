import React from 'react';

import useMobile from 'hooks/useMobile';

import styles from './EsgBlock.module.css';
import EsgBlockDesktop from './EsgBlockDesktop';
import EsgBlockMobile from './EsgBlockMobile';

const EsgBlockRoot = props => {
  const isMobile = useMobile();

  if (isMobile) {
    return <EsgBlockMobile className={styles.root} {...props} />;
  } else {
    return <EsgBlockDesktop className={styles.root} {...props} />;
  }
};

export default EsgBlockRoot;
