import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Heading.module.css';

const sizeOptions = ['l', 'm', 'sl', 'sm'];

const Heading = ({ Tag, size, bold, light, center, marginBottom, children, style, className }) => (
  <Tag
    className={cn(styles[size], className, {
      [styles.bold]: bold,
      [styles.light]: light,
      [styles.center]: center,
      [styles.marginBottom]: marginBottom,
    })}
    style={style}
  >
    {children}
  </Tag>
);
Heading.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  Tag: PropTypes.string,
  bold: PropTypes.bool,
  light: PropTypes.bool,
  center: PropTypes.bool,
  marginBottom: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};
Heading.defaultProps = {
  children: '',
  size: 'headingM',
  Tag: 'h1',
  bold: false,
};

export default Heading;
