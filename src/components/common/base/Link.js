import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Link.module.css';

const Link = props => (
  <RouterLink {...props} className={cn(styles.link, props.className)} />
);

export default Link;
