import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Subheading.module.css';

const sizeOptions = ['l', 'm'];

const Subheading = ({
  Tag,
  size,
  bold,
  light,
  center,
  marginBottom,
  marginBottomS,
  children,
  style,
  className,
}) => (
  <Tag
    className={cn(styles[size], className, {
      [styles.bold]: bold,
      [styles.light]: light,
      [styles.center]: center,
      [styles.marginBottom]: marginBottom,
      [styles.marginBottomS]: marginBottomS,
    })}
    style={style}
  >
    {children}
  </Tag>
);

Subheading.propTypes = {
  Tag: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  light: PropTypes.bool,
  marginBottom: PropTypes.bool,
  marginBottomS: PropTypes.bool,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  style: PropTypes.object,
};

Subheading.defaultProps = {
  size: 'm',
  Tag: 'div',
};

export default Subheading;
