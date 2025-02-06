import React from 'react';
import cn from 'classnames';
import { useMedia } from 'react-use';

import EsgBlockDesktop from './EsgBlockDesktop';
import EsgBlockMobile from './EsgBlockMobile';
import styles from './EsgBlock.module.css';

const EsgBlockRoot = () => {
  const isMobile = useMedia('(max-width: 849px)');

  if (isMobile) {
    return <EsgBlockMobile className={cn(styles.root, styles.mobile)} />;
  } else {
    return <EsgBlockDesktop className={styles.root} />;
  }
};

export default EsgBlockRoot;
