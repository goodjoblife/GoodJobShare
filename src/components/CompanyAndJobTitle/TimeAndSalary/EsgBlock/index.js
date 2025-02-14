import React from 'react';

import EsgBlockDesktop from './EsgBlockDesktop';
import EsgBlockMobile from './EsgBlockMobile';
import styles from './EsgBlock.module.css';
import useMobile from 'hooks/useMobile';

const EsgBlockRoot = () => {
  const isMobile = useMobile();

  if (isMobile) {
    return <EsgBlockMobile className={styles.root} />;
  } else {
    return <EsgBlockDesktop className={styles.root} />;
  }
};

export default EsgBlockRoot;
