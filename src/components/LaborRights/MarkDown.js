import React from 'react';
import marked from 'marked';
import styles from './MarkDown.module.css';

const MarkDown = ({ children }) => (
  <pre
    className={`pL ${styles.md}`}
    dangerouslySetInnerHTML={{
      __html: marked(children),
    }}
  />
);

MarkDown.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default MarkDown;
