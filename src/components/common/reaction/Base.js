import React, { PropTypes } from 'react';

import styles from './Base.module.css';

const renderLabel = label => {
  if (typeof label === 'undefined') {
    return null;
  }
  return <div>{label}</div>;
};

const renderCount = count => {
  if (typeof count === 'undefined') {
    return null;
  }
  return <div>{count}</div>;
};

const Base = ({ fontClass, children, label, count }) => (
  <div className={`${fontClass || 'pS'} ${styles.container}`}>
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
  // toggled: PropTypes.bool,
};

export default Base;
