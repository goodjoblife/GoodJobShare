import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './ButtonRect.module.css';

const ButtonRect = ({ className, to, ...restProps }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={cn(styles.container, className)}
        {...restProps}
      />
    );
  } else {
    return (
      <button className={cn(styles.container, className)} {...restProps} />
    );
  }
};

ButtonRect.propTypes = {
  className: PropTypes.string,
};

ButtonRect.defaultProps = {
  className: '',
};

export default ButtonRect;
