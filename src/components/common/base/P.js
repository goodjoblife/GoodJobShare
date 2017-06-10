import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './P.module.css';

const sizeOptions = ['l', 'm', 's'];

const P = ({ Tag, size, bold, center, children, style, className }) => (
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
P.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  Tag: PropTypes.string,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};
P.defaultProps = {
  children: '',
  size: 'm',
  Tag: 'p',
  bold: false,
};

export default P;
