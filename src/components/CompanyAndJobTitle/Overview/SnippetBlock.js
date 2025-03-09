import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import EmptyView from '../EmptyView';
import styles from './Overview.module.css';
import { Heading } from 'common/base';

const SnippetBlock = ({
  title,
  children,
  linkText,
  linkTo,
  isEmpty,
  pageType,
  pageName,
  tabType,
}) => (
  <div className={styles.snippet}>
    <Heading className={styles.title} Tag="h2">
      {title}
    </Heading>
    {isEmpty ? (
      <EmptyView tabType={tabType} pageName={pageName} pageType={pageType} />
    ) : (
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
  children: PropTypes.node.isRequired,
  isEmpty: PropTypes.bool,
  linkText: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

SnippetBlock.defaultProps = {
  isEmpty: false,
};

export default SnippetBlock;
