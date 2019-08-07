import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';
import styles from './Overview.module.css';

const createEmptyTitle = ({ title, pageName, pageType }) =>
  `尚無${title}！等待${
    pageType === PAGE_TYPE.COMPANY
      ? `${pageName}員工`
      : pageType === PAGE_TYPE.JOB_TITLE
      ? pageName
      : '過來人'
  }分享...`;

const SnippetBlock = ({
  title,
  children,
  linkText,
  linkTo,
  isEmpty,
  pageType,
  pageName,
}) => (
  <div className={styles.snippet}>
    <div className={styles.title}>
      {isEmpty ? createEmptyTitle({ title, pageType, pageName }) : title}
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
  isEmpty: PropTypes.bool,
  pageType: PropTypes.oneOf([PAGE_TYPE.COMPANY, PAGE_TYPE.JOB_TITLE])
    .isRequired,
  pageName: PropTypes.string.isRequired,
};

SnippetBlock.defaultProps = {
  isEmpty: false,
};

export default SnippetBlock;
