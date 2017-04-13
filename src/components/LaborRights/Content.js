import React from 'react';
import marked from 'marked';
import styles from './Content.module.css';

const Content = ({ children }) => (
  <pre
    className={`pL ${styles.content}`}
    dangerouslySetInnerHTML={{
      __html: marked(children),
    }}
  />
);

Content.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default Content;
