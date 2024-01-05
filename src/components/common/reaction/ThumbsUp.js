import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Like from 'common/icons/Like';
import Base from './Base';
import styles from './Base.module.css';

const ThumbsUp = ({ onClick, toggled, ...restProps }) => (
  <Base onClick={onClick} {...restProps}>
    <Like className={cn({ [styles.toggled]: toggled })} />
  </Base>
);

ThumbsUp.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ThumbsUp;
