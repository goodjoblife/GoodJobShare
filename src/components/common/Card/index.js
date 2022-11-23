import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Card.module.css';

const Card = ({ className, children }) => (
  <div className={cn(styles.card, className)}>{children}</div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
