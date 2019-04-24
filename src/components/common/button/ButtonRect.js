import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ButtonRect.module.css';

const ButtonRect = ({ className, ...restProps }) => (
  <button className={cn(styles.container, className)} {...restProps} />
);

ButtonRect.propTypes = {
  className: PropTypes.string,
};

ButtonRect.defaultProps = {
  className: '',
};

export default ButtonRect;
