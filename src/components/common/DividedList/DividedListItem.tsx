import React from 'react';

import { P } from 'common/base';

import styles from './DividedList.module.css';

type Props = {
  label: React.ReactNode;
  children: React.ReactNode;
};

const DividedListItem: React.FC<Props> = ({ label, children }) => (
  <div className={styles.item}>
    <P size="m" bold>
      {label}
    </P>
    {children}
  </div>
);

export default DividedListItem;
