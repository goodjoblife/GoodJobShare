import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Section.module.css';

const Section = React.forwardRef(
  (
    {
      Tag = 'section',
      pageTop = false,
      bg = false,
      padding = false,
      paddingTop = false,
      paddingBottom = false,
      center = false,
      children,
      marginTop = false,
      className = null,
      ...props
    },
    ref,
  ) => (
    <Tag
      ref={ref}
      className={cn(className, {
        [styles.pageTop]: pageTop,
        [styles.padding]: padding,
        [styles.paddingTop]: paddingTop,
        [styles.paddingBottom]: paddingBottom,
        [styles.center]: center,
        [styles.marginTop]: marginTop,
      })}
      style={{ backgroundColor: bg }}
      {...props}
    >
      {children}
    </Tag>
  ),
);

Section.propTypes = {
  Tag: PropTypes.string,
  bg: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  marginTop: PropTypes.bool,
  padding: PropTypes.bool,
  paddingBottom: PropTypes.bool,
  paddingTop: PropTypes.bool,
  pageTop: PropTypes.bool,
};

export default Section;
