import React, { PropTypes } from 'react';
import cn from 'classnames';

import Base from './Base';
import Heart from '../../images/heart.svg';
import styles from './Base.module.css';

const ThumbsUp = ({ onClick, toggled, ...restProps }) => (
  <Base {...restProps}>
    <Heart
      onClick={onClick}
      className={cn(
        toggled ? styles.toggled : '',
        onClick ? styles.clickable : ''
      )}
    />
  </Base>
);

ThumbsUp.propTypes = {
  fontClass: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.number,
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ThumbsUp;
