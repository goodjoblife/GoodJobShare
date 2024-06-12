import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Heading.module.css';

const sizeOptions = ['l', 'm', 'sl', 'sm'];

const Heading = ({
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
Heading.propTypes = {
  Tag: PropTypes.string,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  light: PropTypes.bool,
  marginBottom: PropTypes.bool,
  marginBottomS: PropTypes.bool,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  style: PropTypes.object,
};
Heading.defaultProps = {
  children: '',
  size: 'm',
  Tag: 'h1',
  bold: false,
  marginBottom: false,
  marginBottomS: false,
};

export default Heading;
