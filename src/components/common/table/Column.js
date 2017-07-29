import React, { PropTypes } from 'react';
import cn from 'classnames';

const Column = ({ children, className, alignRight }) => (
  <th className={cn(className, alignRight && 'alignRight')}>{children}</th>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object,
  alignRight: PropTypes.bool,
};

export default Column;
