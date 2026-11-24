import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Card.module.css';

const Card = ({ className, children, ...props }) => (
  <div className={cn(styles.card, className)} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
