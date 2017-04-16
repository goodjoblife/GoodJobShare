import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
  prev: ImmutablePropTypes.map,
  next: ImmutablePropTypes.map,
};

const Pager = ({
  className = '', id, title, coverUrl = '', children,
}) => (
  <div className={`${styles.pager} ${className}`}>
    <IndexLink to={`/labor-rights/${id}`}>
      <div className={`pLBold ${styles.text}`}>
        {children}
      </div>
      <img alt={title} src={coverUrl} className={styles.cover} />
    </IndexLink>
  </div>
);

Pager.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  coverUrl: PropTypes.string,
  children: PropTypes.node,
};

export default Pagers;
