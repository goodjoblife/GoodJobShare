import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

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

const Base = ({ className, style, children, label, count, onClick }) => (
  <div
    className={cn(className, styles.container)}
    style={style}
    onClick={onClick}
  >
    <div>{children}</div>
    {renderLabel(label)}
    {renderCount(count)}
  </div>
);

Base.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
  count: PropTypes.number,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Base;
