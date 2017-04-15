import React from 'react';
import { IndexLink } from 'react-router';
import { Map } from 'immutable';
import styles from './Pagers.module.css';

const Pagers = ({ prev, next }) => (
  <div className={styles.pagers}>
    <Pager
      className={`${styles.left} ${prev && styles.active}`}
      {...prev && prev.toJS()}
    >
      {'\u003C '}前一課
    </Pager>
    <Pager
      className={`${styles.right} ${next && styles.active}`}
      {...next && next.toJS()}
    >
      下一課{' \u003E'}
    </Pager>
  </div>
);

Pagers.propTypes = {
  prev: React.PropTypes.instanceOf(Map),
  next: React.PropTypes.instanceOf(Map),
};

const Pager = ({ className, id, title, coverUrl, children }) => (
  <IndexLink to={`/labor-rights/${id}`}>
    <div className={`${styles.pager} ${className}`}>
      <div className={`pLBold ${styles.text}`}>
        {children}
      </div>
      <img alt={title} src={coverUrl} className={styles.cover} />
    </div>
  </IndexLink>
);

Pager.propTypes = {
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  coverUrl: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Pagers;
