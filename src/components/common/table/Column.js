import React, { PropTypes } from 'react';

const Column = ({ children }) => (
  <th>{children}</th>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Column;
