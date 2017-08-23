import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Popover.module.css';

const Popover = ({ active, className, children }) =>
  <div
    className={cn(
      styles.popover,
      { [styles.active]: active },
      className,
    )}
    onClick={e => { e.stopPropagation(); }}
  >
    {children}
  </div>;

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
};

Popover.defaultProps = {
  className: '',
  active: false,
};

export default Popover;
