import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Table.module.css';

const Column = ({ children, title, className, alignRight }) => (
  <th className={cn(className, { [styles.alignRight]: alignRight })}>
    {children || title}
  </th>
);

Column.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
  alignRight: PropTypes.bool,
};

Column.defaultProps = {
  children: null,
};

export default Column;
