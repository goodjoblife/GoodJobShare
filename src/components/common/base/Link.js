import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import styles from './Link.module.css';

const Link = ({ className, ...props }) => (
  <ReactRouterLink className={cn(styles.link, className)} {...props} />
);

Link.propTypes = {
  className: PropTypes.string,
};

export default Link;
