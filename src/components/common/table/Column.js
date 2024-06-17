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
  alignRight: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
};

Column.defaultProps = {
  children: null,
};

export default Column;
