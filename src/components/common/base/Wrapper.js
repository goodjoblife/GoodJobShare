import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Wrapper.module.css';

const sizeOptions = ['l', 'm', 's'];

const Wrapper = ({ Tag, size, children, className, onClick }) => (
  <Tag onClick={onClick} className={cn(styles[size], className)}>
    {children}
  </Tag>
);
Wrapper.propTypes = {
  Tag: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(sizeOptions).isRequired,
};
Wrapper.defaultProps = {
  size: 'l',
  Tag: 'div',
};

export default Wrapper;
