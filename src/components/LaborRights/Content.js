import React from 'react';
import marked from 'marked';
import styles from './Content.module.css';

const Content = ({ content, children }) => (
  <div className={styles.content}>
    <pre
      className={`pL ${styles.md}`}
      dangerouslySetInnerHTML={{
        __html: marked(content),
      }}
    />
    {children}
  </div>
);

Content.propTypes = {
  content: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

export default Content;
