import React from 'react';
import cn from 'classnames';

import EsgBlockDesktop from './EsgBlockDesktop';
import EsgBlockMobile from './EsgBlockMobile';
import styles from './EsgBlock.module.css';

const EsgBlockRoot = () => (
  <React.Fragment>
    <EsgBlockDesktop className={styles.root} />
    <EsgBlockMobile className={cn(styles.root, styles.mobile)} />
  </React.Fragment>
);

export default EsgBlockRoot;
