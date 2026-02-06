import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import EmptyView from '../EmptyView';
import styles from './Overview.module.css';
import { Heading, Link } from 'common/base';

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
    <Heading className={cn(styles.title, styles.aboveCard)} Tag="h2">
      {title}
    </Heading>
    {isEmpty ? (
      <EmptyView tabType={tabType} pageName={pageName} pageType={pageType} />
    ) : (
      <React.Fragment>
        {children}
        {linkText && (
          <Link to={linkTo} className={styles.link}>
            {linkText}
          </Link>
        )}
      </React.Fragment>
    )}
  </div>
);

SnippetBlock.propTypes = {
  children: PropTypes.node.isRequired,
  isEmpty: PropTypes.bool,
  linkText: PropTypes.string,
  linkTo: PropTypes.string,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

SnippetBlock.defaultProps = {
  isEmpty: false,
};

export default SnippetBlock;
