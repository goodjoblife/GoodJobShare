import React from 'react';
import marked from 'marked';
import styles from './Body.module.css';

const Body = ({ content, children }) => (
  <div className={styles.body}>
    <pre
      className={`pL ${styles.md}`}
      dangerouslySetInnerHTML={{
        __html: marked(content),
      }}
    />
    {children}
  </div>
);

Body.propTypes = {
  content: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

export default Body;
