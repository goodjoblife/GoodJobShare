import React from 'react';
import marked from 'marked';
import styles from './MarkdownParser.module.css';

const MarkdownParser = ({ content }) => (
  <pre
    className={`pL ${styles.md}`}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: marked(content || ''),
    }}
  />
);

MarkdownParser.propTypes = {
  content: React.PropTypes.string.isRequired,
};

export default MarkdownParser;
