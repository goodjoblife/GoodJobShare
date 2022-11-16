import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './RoundCard.module.css';

const RoundCard = ({ children, className, ...props }) => (
  <div className={cn(styles.container, className)} {...props}>
    {children}
  </div>
);

RoundCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default RoundCard;
