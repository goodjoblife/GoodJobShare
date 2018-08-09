import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Wrapper.module.css';

const sizeOptions = ['l', 'm', 's'];

const Wrapper = ({ Tag, size, children, className }) => (
  <Tag className={cn(styles[size], className)}>{children}</Tag>
);
Wrapper.propTypes = {
  Tag: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(sizeOptions).isRequired,
  className: PropTypes.string,
};
Wrapper.defaultProps = {
  size: 'l',
  Tag: 'div',
};

export default Wrapper;
