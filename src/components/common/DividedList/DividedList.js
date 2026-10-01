import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './DividedList.module.css';

const DividedList = ({ className, children }) => (
  <div className={cn(styles.list, className)}>{children}</div>
);

DividedList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default DividedList;
