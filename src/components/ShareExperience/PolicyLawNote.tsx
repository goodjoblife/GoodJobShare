import faBook from '@fortawesome/fontawesome-free-solid/faBook';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import React from 'react';

import styles from './PolicyLawNote.module.css';

type Props = {
  lawName: string;
  children: React.ReactNode;
};

const PolicyLawNote = ({ lawName, children }: Props): React.ReactElement => (
  <div className={styles.container}>
    <div className={styles.leftCol}>
      <FontAwesomeIcon icon={faBook} />
      <span className={styles.lawName}>{lawName}</span>
    </div>
    <div className={styles.description}>{children}</div>
  </div>
);

export default PolicyLawNote;
