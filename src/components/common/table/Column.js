import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Table.module.css';

const Column = ({ children, className, alignRight }) => (
  <th className={cn(className, { [styles.alignRight]: alignRight })}>{children}</th>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alignRight: PropTypes.bool,
};

export default Column;
