import React from 'react';
import { IndexLink } from 'react-router';
import styles from './Pagers.module.css';

const Pagers = ({ prev, next }) => (
  <div className={styles.pagers}>
    <IndexLink to={`/labor-rights/${prev}`}>
      <div
        className={`${styles.pager} ${styles.left} ${prev && styles.active}`}
      >
        <div className={`pLBold ${styles.text}`}>
          {'\u003C '}前一課
        </div>
        <div className={styles.image} />
      </div>
    </IndexLink>
    <IndexLink to={`/labor-rights/${next}`}>
      <div
        className={`${styles.pager} ${styles.right} ${next && styles.active}`}
      >
        <div className={`pLBold ${styles.text}`}>
          下一課{' \u003E'}
        </div>
        <div className={styles.image} />
      </div>
    </IndexLink>
  </div>
);

Pagers.propTypes = {
  prev: React.PropTypes.string,
  next: React.PropTypes.string,
};

export default Pagers;
