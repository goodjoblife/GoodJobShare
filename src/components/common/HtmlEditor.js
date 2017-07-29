import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './HtmlEditor.module.css';

const HtmlEditor = ({ children, className }) => (
  <div className={cn(styles.htmlEditor, className)}>
    {children}
  </div>
);

HtmlEditor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default HtmlEditor;
