import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Section.module.css';

const Section = ({
  Tag,
  pageTop,
  bg,
  padding,
  paddingTop,
  paddingBottom,
  center,
  children,
  marginTop,
  className,
  ...props
}) => (
  <Tag
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
Section.defaultProps = {
  Tag: 'section',
};

export default Section;
