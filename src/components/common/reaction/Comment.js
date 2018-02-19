import React from 'react';
import PropTypes from 'prop-types';

import i from 'common/icons';
import Base from './Base';

const Comment = ({ onClick, ...restProps }) => (
  <Base {...restProps} onClick={onClick}>
    <i.Comment />
  </Base>
);

Comment.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
  onClick: PropTypes.func,
};

export default Comment;
