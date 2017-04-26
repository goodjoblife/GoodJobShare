import React, { PropTypes } from 'react';

import Base from './Base';
import Bubble from '../../images/bubble.svg';
import styles from './Base.module.css';

const Comment = ({ onClick, ...restProps }) => (
  <Base {...restProps}>
    <Bubble
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
