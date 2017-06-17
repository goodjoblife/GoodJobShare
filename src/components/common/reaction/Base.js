import React, { PropTypes } from 'react';

import styles from './Base.module.css';

const renderLabel = label => {
  if (typeof label === 'undefined') {
    return null;
  }
  return <div className={styles.label}>{label}</div>;
};

const renderCount = count => {
  if (typeof count === 'undefined') {
    return null;
  }
  return <div className={styles.count}>{count}</div>;
};

const Base = ({ fontClass, children, label, count, style }) => (
  <div className={`${fontClass || 'pS'} ${styles.container}`} style={style}>
    <div>{children}</div>
    {renderLabel(label)}
    {renderCount(count)}
  </div>
);

Base.propTypes = {
  fontClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  count: PropTypes.number,
  style: PropTypes.object,
  // toggled: PropTypes.bool,
};

export default Base;
