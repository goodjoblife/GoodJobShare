import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Heading.module.css';

const sizeOptions = ['l', 'm', 'sl', 'sm'];

const Heading = ({
  Tag = 'h1',
  size = 'm',
  bold = false,
  light = false,
  center = false,
  marginBottom = false,
  marginBottomS = false,
  children = '',
  style = {},
  className = '',
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

export default Heading;
