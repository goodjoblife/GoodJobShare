import React, { PropTypes } from 'react';
import cn from 'classnames';

import i from 'common/icons';
import Base from './Base';
import styles from './Base.module.css';

const ThumbsUp = ({ onClick, toggled, ...restProps }) => (
  <Base onClick={onClick} {...restProps}>
    <i.Like
      className={cn({ [styles.toggled]: toggled })}
    />
  </Base>
);

ThumbsUp.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ThumbsUp;
