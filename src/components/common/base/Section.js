import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Section.module.css';

const Section = ({ Tag, pageTop, bg, padding, paddingTop, paddingBottom, center, children, className, ...props }) => (
  <Tag
    className={cn(className, {
      [styles.pageTop]: pageTop,
      [styles.padding]: padding,
      [styles.paddingTop]: paddingTop,
      [styles.paddingBottom]: paddingBottom,
      [styles.center]: center,
    })}
    style={{ backgroundColor: bg }}
    {...props}
  >
    {children}
  </Tag>
);
Section.propTypes = {
  Tag: PropTypes.string,
  children: PropTypes.node,
  pageTop: PropTypes.bool,
  padding: PropTypes.bool,
  paddingTop: PropTypes.bool,
  paddingBottom: PropTypes.bool,
  center: PropTypes.bool,
  bg: PropTypes.string,
  className: PropTypes.string,
};
Section.defaultProps = {
  Tag: 'section',
};

export default Section;
