import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './RoundCard.module.css';

const RoundCard = ({ children, className, checked, ...props }) => (
  <div
    className={cn(styles.container, { [styles.checked]: checked })}
    {...props}
  >
    <div className={className}>{children}</div>
  </div>
);

RoundCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  checked: PropTypes.bool,
};

export default RoundCard;
