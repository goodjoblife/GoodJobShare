import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './P.module.css';

const sizeOptions = ['l', 'm', 's'];

const P = ({
  Tag,
  size,
  bold,
  center,
  children,
  style,
  className,
  title,
  ...props
}) => (
  <Tag
    className={cn(styles[size], className, {
      [styles.bold]: bold,
      [styles.center]: center,
    })}
    style={style}
    title={title}
    {...props}
  >
    {children}
  </Tag>
);
P.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  Tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
};
P.defaultProps = {
  children: '',
  size: 'm',
  Tag: 'div',
  bold: false,
};

export default P;
