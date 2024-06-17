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
  Tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  style: PropTypes.object,
  title: PropTypes.string,
};
P.defaultProps = {
  children: '',
  size: 'm',
  Tag: 'div',
  bold: false,
};

export default P;
