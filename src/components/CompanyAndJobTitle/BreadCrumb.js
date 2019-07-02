import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  pageTypeTranslation,
  tabTypeTranslation,
  pageTypeURLMap,
  tabTypeURLMap,
  pageType,
  tabType,
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

const BreadCrumb = ({ style, pageType, pageName, tabType }) => (
  <div style={style}>
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
  pageType: PropTypes.oneOf([pageType.COMPANY, pageType.JOB_TITLE]),
  pageName: PropTypes.string,
  tabType: PropTypes.oneOf([
    tabType.OVERVIEW,
    tabType.TIME_AND_SALARY,
    tabType.WORK_EXPERIENCE,
    tabType.INTERVIEW_EXPERIENCE,
  ]),
};

export default BreadCrumb;
