import React from 'react';
import PropTypes from 'prop-types';

import CommentIcon from 'common/icons/Comment';
import Base from './Base';

const Comment = ({ onClick, ...restProps }) => (
  <Base {...restProps} onClick={onClick}>
    <CommentIcon />
  </Base>
);

Comment.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
  onClick: PropTypes.func,
};

export default Comment;
