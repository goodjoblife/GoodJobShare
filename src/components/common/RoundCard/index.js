import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
  checked: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default RoundCard;
