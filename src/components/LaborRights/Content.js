import React from 'react';
import marked from 'marked';
import styles from './Content.module.css';

const Content = ({ content }) => (
  <pre
    className={`pL ${styles.content}`}
    dangerouslySetInnerHTML={{
      __html: marked(content),
    }}
  />
);

Content.propTypes = {
  content: React.PropTypes.string.isRequired,
};

export default Content;
