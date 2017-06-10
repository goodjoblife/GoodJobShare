import React, { PropTypes } from 'react';

import i from 'common/icons';
import Base from './Base';
import styles from './Base.module.css';

const Comment = ({ onClick, ...restProps }) => (
  <Base {...restProps}>
    <i.Comment
      onClick={onClick}
      className={onClick ? styles.clickable : ''}
    />
  </Base>
);

Comment.propTypes = {
  fontClass: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.number,
  onClick: PropTypes.func,
};

export default Comment;
