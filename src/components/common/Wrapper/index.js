import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Wrapper.module.css';

const sizeOptions = ['l', 'm', 's'];

const Wrapper = ({ Tag, size, pageTop, padding, children, style, className }) => (
  <Tag
    className={cn(styles[size], className, {
      [styles.pageTop]: pageTop,
      [styles.padding]: padding,
    })}
    style={style}
  >
    {children}
  </Tag>
);
Wrapper.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  pageTop: PropTypes.bool,
  padding: PropTypes.bool,
  Tag: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};
Wrapper.defaultProps = {
  children: '',
  size: 'l',
  Tag: 'div',
};

export default Wrapper;
