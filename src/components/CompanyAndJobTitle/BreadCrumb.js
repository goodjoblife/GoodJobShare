import React from 'react';
import PropTypes from 'prop-types';

const BreadCrumb = ({ pageType, pageName, tabType }) => (
  <div>
    <p>{pageType}</p>
    <p>{pageName}</p>
    <p>{tabType}</p>
  </div>
);

BreadCrumb.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};

export default BreadCrumb;
