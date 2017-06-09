import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Heading.module.css';

const sizeOptions = ['headingL', 'headingM', 'subheadingL', 'subheadingM'];

const Heading = ({ Tag, size, bold, center, children, style, className }) => (
  <Tag
    className={cn(styles[size], className, {
      [styles.bold]: bold,
      [styles.center]: center,
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
  center: PropTypes.bool,
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
