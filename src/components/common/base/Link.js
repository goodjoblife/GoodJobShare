import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Link.module.css';

export default ({ className, ...props }) => (
  <Link className={cn(styles.link, className)} {...props}></Link>
);
