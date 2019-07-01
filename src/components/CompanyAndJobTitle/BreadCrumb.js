import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  pageTypeTranslation,
  tabTypeTranslation,
  pageTypeURLMap,
  tabTypeURLMap,
} from '../../constants/companyJobTitle';

const CrumbLink = ({ children, to }) => (
  <Link to={to}>
    <span
      style={{
        color: '#555555',
        fontSize: '13px',
      }}
    >
      {children}
    </span>
  </Link>
);

const BreadCrumb = ({ pageType, pageName, tabType }) => (
  <div>
    <CrumbLink to="/salary-work-times/latest">
      {pageTypeTranslation[pageType]}
    </CrumbLink>
    {' > '}
    <CrumbLink to={`/${pageTypeURLMap[pageType]}/${pageName}`}>
      {pageName}
    </CrumbLink>
    {' > '}
    <CrumbLink
      to={`/${pageTypeURLMap[pageType]}/${pageName}/${tabTypeURLMap[tabType]}`}
    >
      {tabTypeTranslation[tabType]}
    </CrumbLink>
  </div>
);

BreadCrumb.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};

export default BreadCrumb;
