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
  children: PropTypes.node,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  Tag: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  light: PropTypes.bool,
  center: PropTypes.bool,
  marginBottom: PropTypes.bool,
  marginBottomS: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

Subheading.defaultProps = {
  size: 'm',
  Tag: 'div',
};

export default Subheading;
