import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Table.module.css';

const Column = ({ children, className, alignRight }) => (
  <th className={cn(className, { [styles.alignRight]: alignRight })}>
    {children}
  </th>
);

Column.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  alignRight: PropTypes.bool,
};

Column.defaultProps = {
  children: null,
};

export default Column;
