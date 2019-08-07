import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Overview.module.css';

const SnippetBlock = ({ title, children, linkText, linkTo, isEmpty }) => (
  <div className={styles.snippet}>
    <div className={styles.title}>
      {isEmpty ? `尚無${title}！等待過來人分享...` : title}
    </div>
    {!isEmpty && (
      <React.Fragment>
        {children}
        <Link className={styles.link} to={linkTo}>
          {linkText}
        </Link>
      </React.Fragment>
    )}
  </div>
);

SnippetBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  linkText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  isEmpty: PropTypes.bool.isRequired,
};

export default SnippetBlock;
