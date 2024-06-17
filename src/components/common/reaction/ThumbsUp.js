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
  count: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func,
  toggled: PropTypes.bool,
};

export default ThumbsUp;
