import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Overview.module.css';

const SnippetBlock = ({ title, children, linkText, linkTo }) => (
  <div className={styles.snippet}>
    <div className={styles.title}>{title}</div>
    {children}
    <Link className={styles.link} to={linkTo}>
      {linkText}
    </Link>
  </div>
);

SnippetBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  linkText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default SnippetBlock;
