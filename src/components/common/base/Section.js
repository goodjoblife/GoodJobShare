import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Section.module.css';

const Section = ({ Tag, pageTop, bg, padding, paddingTop, paddingBottom, children, className }) => (
  <Tag
    className={cn(className, {
      [styles.pageTop]: pageTop,
      [styles.padding]: padding,
      [styles.paddingTop]: paddingTop,
      [styles.paddingBottom]: paddingBottom,
    })}
    style={{ backgroundColor: bg }}
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
  bg: PropTypes.string,
  className: PropTypes.string,
};
Section.defaultProps = {
  Tag: 'section',
};

export default Section;
