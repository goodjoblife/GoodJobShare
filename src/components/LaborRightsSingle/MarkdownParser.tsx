import { marked } from 'marked';
import React from 'react';

import styles from './MarkdownParser.module.css';

type MarkdownParserProps = {
  content?: string;
};

const MarkdownParser: React.FC<MarkdownParserProps> = ({ content = '' }) => (
  <div
    className={styles.md}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: marked.parse(content) as string,
    }}
  />
);

export default MarkdownParser;
