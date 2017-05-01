import React from 'react';
import marked from 'marked';
import styles from './MarkdownParser.module.css';

const MarkdownParser = ({ content }) => (
  <div
    className={styles.md}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: marked(content),
    }}
  />
);

MarkdownParser.propTypes = {
  content: React.PropTypes.string.isRequired,
};
MarkdownParser.defaultProps = {
  content: '',
};

export default MarkdownParser;
