import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ButtonRect.module.css';

/**
 * If you use Link (from react-router-dom) as Tag, do not
 * forget to pass 'to' props to this component.
 */
const ButtonRect = ({ Tag, className, ...restProps }) => (
  <Tag className={cn(styles.container, className)} {...restProps} />
);

ButtonRect.propTypes = {
  className: PropTypes.string,
};

ButtonRect.defaultProps = {
  className: '',
  Tag: 'button',
};

export default ButtonRect;
