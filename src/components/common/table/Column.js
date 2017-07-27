import React, { PropTypes } from 'react';

const Column = ({ children, className }) => (
  <th className={className}>{children}</th>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object,
};

export default Column;
